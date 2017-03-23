package com.kanjihybrid.engine.resource;

import com.kanjihybrid.engine.dto.GenericDto;
import com.kanjihybrid.engine.model.Cleaning;
import com.kanjihybrid.engine.model.KanjiHybrid;
import com.kanjihybrid.engine.model.KanjiHybridPhrase;
import com.kanjihybrid.engine.model.MorningSun;
import com.kanjihybrid.engine.repository.CleaningRepo;
import com.kanjihybrid.engine.repository.KanjiHybridPhraseRepo;
import com.kanjihybrid.engine.repository.KanjiHybridRepo;
import com.kanjihybrid.engine.repository.MorningSunRepo;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.lang.reflect.Array;
import java.util.List;

import static java.util.Objects.deepEquals;
import static org.apache.commons.lang3.ArrayUtils.subarray;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * @author Frank Lloyd Teh (modified by Louie gen)
 */

@RestController
public class TranslationResource {

    @Resource(name = "kanjiHybridRepo")
    private KanjiHybridRepo kanjiHybridRepo;

    @Resource(name = "kanjiHybridPhraseRepo")
    private KanjiHybridPhraseRepo kanjiHybridPhraseRepo;

    @Resource(name = "cleaningRepo")
    private CleaningRepo cleaningRepo;

    @Resource(name = "morningSunRepo")
    private MorningSunRepo morningSunRepo;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/translate", method = POST)
    public GenericDto<String> save(@RequestBody GenericDto<String> dto) {
        String english = dto.getData();
        StringBuilder translation = new StringBuilder();

        String the_Cleaned_Word = "";
        JSONObject cleanJObj = new JSONObject();
        int count_Cleaning=0;


        // This separates words and non words, just call all of them words
        english = removeExtraSpaces(english);
        String[] words = english.split("((?<=\\W)|(?=\\W))");

        for (int i = 0; i < words.length; i++) {
            String word = words[i];

            // System.out.print(word);

            /** Simply append  non words and continue **/
            if (word.equals(" ")) {
                translation.append(word);
                continue;
            }

            /** START of Kanji hybrid Phrase **/
            /** this code will be obsolete once there is context analysis **/
            List<KanjiHybridPhrase> kanjiHybridPhrases = kanjiHybridPhraseRepo.findByEnglishIgnoreCaseStartsWith(word);
            if (kanjiHybridPhrases != null && kanjiHybridPhrases.size() > 0) {
                boolean phraseMatched = false;
                for (KanjiHybridPhrase phrase : kanjiHybridPhrases) {
                    int matchLength = matchPhrase(i, words, phrase);
                    if (matchLength > 0) {
                        String hybrid = phrase.getHybrid().trim();
                        translation.append(hybrid);
                        i += (matchLength - 1); //to skip on the next word
                        phraseMatched = true;
                        break;
                    }
                }
                if (phraseMatched)
                    continue;
            }
            /** END of Kanji hybrid Phrase**/

            /**starts cleaning**/
            List<Cleaning> cleanings = cleaningRepo.findByCleanedIgnoreCaseStartsWith(word);
            if(cleanings != null && cleanings.size()>0) {
                boolean cleaningMatched = false;
                for (Cleaning cleaned : cleanings) {
                    String[] matchCleaning = matchCleaning(i, words, cleaned);
                    if(Integer.parseInt(matchCleaning[0]) > 0){
                        JSONObject chuckData = new JSONObject();

                        chuckData.put("idxTo",String.valueOf(translation.length()));
                        chuckData.put("wordTo",cleaned.getCompound_cleaned());

                        cleanJObj.put(String.valueOf(count_Cleaning),chuckData);
                        System.out.println(cleaned.getCompound_cleaned());
                        i += (Integer.parseInt(matchCleaning[0])-1);
                        count_Cleaning+=1;
                        cleaningMatched = true;
                        break;
                    }
                }
                if(cleaningMatched)
                    continue;
            }

            List<KanjiHybrid> kanjiHybrids = kanjiHybridRepo.findByEnglishIgnoreCaseOrderByBias(word);
            boolean notTranslated = true;
            if (kanjiHybrids != null && kanjiHybrids.size() > 0) {
                //TODO need to determine context, for now use the bias 1
                for (KanjiHybrid kanjiHybrid : kanjiHybrids) {

                    if (!kanjiHybrid.getBias().equals("Bias0") && notTranslated) {
                        translation.append(kanjiHybrid.getHybrid());
                        notTranslated = false;
                    }
                }
            }
            if (notTranslated) {
                translation.append(word);
            }

        }

        int lastcleanIdx = 0;
        int lenghtIdx = 0;
        if(cleanJObj.length() != 0){
            for(int idx = 0; idx<cleanJObj.length();idx++){
                JSONObject cleanJObjRes = cleanJObj.getJSONObject(String.valueOf(idx));
                int cleanIdx = cleanJObjRes.getInt("idxTo");
                String cleanWord = cleanJObjRes.getString("wordTo");
                switch (lastcleanIdx){
                    case 0:
                        translation.insert(cleanIdx,cleanWord);
                        lastcleanIdx = (cleanIdx==0)? 1 : cleanIdx;
                        break;
                    default:
                        String lastCleanWord = cleanJObj.getJSONObject(String.valueOf(idx-1)).getString("wordTo");
                        lenghtIdx += lastCleanWord.length();
                        int insertIdx = lenghtIdx + cleanIdx;
                        translation.insert(insertIdx, cleanWord);
                        lastcleanIdx = cleanIdx;
                        break;
                }
            }
        }


        dto.setData(translation.toString());

        return dto;
    }

    private int matchPhrase(int idx, String[] words, KanjiHybridPhrase phrase) {
        String[] kanjiPhraseWords = removeExtraSpaces(phrase.getEnglish()).split("((?<=\\W)|(?=\\W))"); //splip per word
        String[] wordsSubset = subarray(words, idx, idx + kanjiPhraseWords.length); //get the
        return deepEquals(convertTolower(kanjiPhraseWords), convertTolower(wordsSubset)) ? wordsSubset.length : 0;
    }

    private String[] matchCleaning(int idx, String[] words, Cleaning cleaning) {
        String[] CleanedWords = removeExtraSpaces(cleaning.getCleaned()).split("((?<=\\W)|(?=\\W))"); //splip per word
        String[] wordsSubset = subarray(words, idx, idx + CleanedWords.length); //get the

        int matchLenght = deepEquals(convertTolower(CleanedWords), convertTolower(wordsSubset)) ? wordsSubset.length : 0;

        String[] cleanedWord  ={String.valueOf(matchLenght), implodeString(wordsSubset)};

        return cleanedWord;
    }

    private String[] convertTolower(String[] word){

        String toLower = implodeString(word);

        return toLower.toString().toLowerCase().split("((?<=\\W)|(?=\\W))");
    }

    private String implodeString(String[] word){

        StringBuilder makeString = new StringBuilder();
        for(String words : word){
            makeString.append(words);
        }

        return makeString.toString();

    }

    private String removeExtraSpaces(String text) {
        return text.trim().replaceAll(" +", " ");
    }

}
