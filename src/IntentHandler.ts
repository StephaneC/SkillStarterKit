
'use strict';

import { HandlerInput, ResponseFactory, ErrorHandler } from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import { audio } from './AudioController';
import { IHandler } from './utils/IHandler';
import { getMessage } from './Constants';
import { clearSession, clearHistory } from './storage/alexastorage';
import { getApplicationId } from './utils/utils';

export const IntentHandler: IHandler = {
    // launch request and play intent have the same handler
    'LaunchRequest': async function (input: HandlerInput): Promise<Response> {
        console.log('LaunchRequest');
        const msg = getMessage(getApplicationId(input), "WELCOME");
        return Promise.resolve(ResponseFactory.init()
        .speak(msg)
        .withShouldEndSession(false)
        .getResponse());
    },
    'AMAZON.ShuffleOnIntent': async function (input: HandlerInput): Promise<Response> {
        return this['random'](input);
    },
    'AMAZON.HelpIntent': async function (input: HandlerInput): Promise<Response> {
        const msg = getMessage(getApplicationId(input), "HELP_MSG");
        return ResponseFactory.init()
            .speak(msg)
            .withShouldEndSession(false)
            .getResponse();
    },
    'SessionEndedRequest': async function (input: HandlerInput): Promise<Response> {
        // No session ended logic
        // do not return a response, as per https://developer.amazon.com/docs/custom-skills/handle-requests-sent-by-alexa.html#sessionendedrequest
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'System.ExceptionEncountered': async function (input: HandlerInput): Promise<Response> {
        console.log("\n******************* EXCEPTION **********************");
        console.log("\n" + JSON.stringify(input.requestEnvelope, null, 2));
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'Unhandled': async function (input: HandlerInput): Promise<Response> {
        const msg = getMessage(getApplicationId(input), "UNHANDLED_MSG");
        input.responseBuilder.speak(msg);
        return Promise.resolve(input.responseBuilder.withShouldEndSession(true).getResponse());
    },
    'AMAZON.PauseIntent': async function (input: HandlerInput): Promise<Response> {
        const msg = getMessage(getApplicationId(input), "PAUSE_MSG");
        return Promise.resolve(audio.stop(msg));
    },
    'AMAZON.CancelIntent': async function (input: HandlerInput): Promise<Response> {
        return this['AMAZON.StopIntent'](input);
    },
    'AMAZON.StopIntent': async function (input: HandlerInput): Promise<Response> {
        const msg = getMessage(getApplicationId(input), "STOP_MSG");
        return Promise.resolve(audio.stop(msg));
    },

    /*'AMAZON.StartOverIntent': async function (input: HandlerInput): Promise<Response> {
        input.responseBuilder.speak(i18n.S(input.requestEnvelope.request, 'NOT_POSSIBLE_MSG'));
        return Promise.resolve(input.responseBuilder.getResponse());
    },*/

    /*
     *  All Requests are received using a Remote Control. 
     *  https://developer.amazon.com/docs/custom-skills/playback-controller-interface-reference.html#requests 
     */
    'PlaybackController.PlayCommandIssued': async function (input: HandlerInput): Promise<Response> {
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'PlaybackController.NextCommandIssued': async function (input: HandlerInput): Promise<Response> {
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'PlaybackController.PreviousCommandIssued': async function (input: HandlerInput): Promise<Response> {
        return Promise.resolve(input.responseBuilder.getResponse());
    },
    'PlaybackController.PauseCommandIssued': async function (input: HandlerInput): Promise<Response> {
        return Promise.resolve(audio.stop(null));
    }
}

export const CustomErrorHandler: ErrorHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        return true;
    },
    handle(input: HandlerInput, error: Error): Response {
        console.log('CustomErrorHandler');
        console.log(JSON.stringify(error));
        const msg = getMessage(getApplicationId(input), "UNHANDLED_MSG");
        return input.responseBuilder
            .speak(msg)
            .withShouldEndSession(true).getResponse();

    }
};