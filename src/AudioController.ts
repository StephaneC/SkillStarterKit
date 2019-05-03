'use strict';

import { ResponseFactory } from 'ask-sdk-core';
import { Response, interfaces } from 'ask-sdk-model';
import { HandlerInput } from 'ask-sdk';

class AudioController {

    private getToken(handlerInput): string {
        // Extracting token received in the request.
        if (handlerInput && handlerInput.requestEnvelope.context && handlerInput.requestEnvelope.context.AudioPlayer) {
          return handlerInput.requestEnvelope.context.AudioPlayer.token;
        }
        return null;
      }
      


    play(input: HandlerInput, url: string, offset: number, text?: string): Response {
        console.log("Will play - " + url);
        /*
             *  Using the function to begin playing audio when:
             *      Play Audio intent invoked.
             *      Resuming audio when stopped/paused.
             *      Next/Previous commands issued.
             */

        /*
           https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#play
           REPLACE_ALL: Immediately begin playback of the specified stream, and replace current and enqueued streams.             
        */
        const result = ResponseFactory.init();

        //result.withStandardCard(episode.title, episode.description, episode.image, episode.image);

        // we are using url as token as they are all unique
        result
            .addAudioPlayerPlayDirective('REPLACE_ALL', url, url, offset)
            .withShouldEndSession(true);

        if (text) {
            result.speak(text);
        }

        // add support for radio meta data.  
        // this is not supported by the SDK yet, so it should be handled manually
        const resp = result.getResponse();
        console.log({resp})
        return resp;
    }

    stop(text: string): Response {
        /*
         *  Issuing AudioPlayer.Stop directive to stop the audio.
         *  Attributes already stored when AudioPlayer.Stopped request received.
         */
        const result = ResponseFactory.init();
        result.addAudioPlayerStopDirective();

        if (text) {
            result.speak(text);
        }

        return result.getResponse();
    }

    add(input: HandlerInput, url: string): Response {
        const result = ResponseFactory.init();

        result
        .addAudioPlayerPlayDirective('ENQUEUE', url, url, 0, this.getToken(input))
        .withShouldEndSession(true);

        return result.getResponse();
    }

    clear(): Response {
        /*
         * Clear the queue and stop the player
         */
        const result = ResponseFactory.init();
        result.addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');

        return result.getResponse();
    }
}
export const audio = new AudioController();