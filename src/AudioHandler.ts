'use strict';

import { HandlerInput } from 'ask-sdk';
import { interfaces, Response } from 'ask-sdk-model';

import { IHandler } from './utils/IHandler';
import { audio } from './AudioController';
import { getApplicationId, getAudioToken, getOffsetInMilliseconds } from './utils/utils';
import { Constants } from './Constants';

export const AudioHandler: IHandler = {

    'AudioPlayer.PlaybackStarted': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackStarted Directive received.
         * Confirming that requested audio file began playing.
         * Do not send any specific response.
         */
        console.log("Playback started");
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'AudioPlayer.PlaybackFinished': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackFinished Directive received.
         * Confirming that audio file completed playing.
         * Do not send any specific response.
         */
        console.log("Playback finished");

        //await addToListened(input, lastPlayed(input));
        /*const episode: Episode = await podcastsBusiness.getEpisode(input, getApplicationId(input));
        if (!episode) {
            const msg = getMessage(getApplicationId(input), "PODCAST_FINISHED");
            input.responseBuilder.speak(msg);
            return Promise.resolve(input.responseBuilder.withShouldEndSession(false).getResponse());    
        }
        const msg = getMessage(getApplicationId(input), "ASK_NEXT");
        input.responseBuilder.speak(msg);*/
        return Promise.resolve(input.responseBuilder.getResponse());
        //return Promise.resolve(input.responseBuilder.withShouldEndSession(false).getResponse());    
    },
    'AudioPlayer.PlaybackStopped': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackStopped Directive received.
         * Confirming that audio file stopped playing.
         */
        console.log("Playback stopped");
        //do not return a response, as per https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#playbackstopped
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'AudioPlayer.PlaybackNearlyFinished': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackNearlyFinished Directive received.
         * Replacing queue with the URL again.
         * This should not happen on live streams
         */
        /*
         * AudioPlayer.PlaybackStopped Directive received.
         * Confirming that audio file stopped playing.
         */
        console.log("Playback nearly finished");
        return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());    
    },
    'AudioPlayer.PlaybackFailed': async function (input: HandlerInput): Promise<Response> {
        /*
         * AudioPlayer.PlaybackFailed Directive received.
         * Logging the error and restarting playing with no output speach
         */
        const request = <interfaces.audioplayer.PlaybackFailedRequest>input.requestEnvelope.request;
        console.log("Playback Failed : " + JSON.stringify(request.error, null, 2));
        return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());    
    }
};