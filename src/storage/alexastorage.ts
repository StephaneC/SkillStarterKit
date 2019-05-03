/******
 * Some vars has been added to storage because session removed while 
 * listening long media (don't know why) 
 * session -> started : suggested during session
 * session -> lastPlayed: current playing media
 * 
 * Some normally user storage
 * Long time storage -> .listened : listened entirely
 * 
 * Some stay in session storage
 * conv.data.cleared : indicate if user recently erased history
 */

import { HandlerInput } from 'ask-sdk';

const getLongTimeStorage = async (handlerInput: HandlerInput) => {
    let attributes = await handlerInput.attributesManager.getPersistentAttributes();
    if (attributes === undefined || Object.keys(attributes).length === 0) {
        attributes = {
        }
        handlerInput.attributesManager.setPersistentAttributes(attributes);
    }
    return attributes;
}

const saveLongTimeStorage = async (handlerInput: HandlerInput, storageAttributes: {
    [key: string]: any}) => {
    handlerInput.attributesManager.setPersistentAttributes(storageAttributes);
    handlerInput.attributesManager.savePersistentAttributes();
}

const getSessionStorage = (handlerInput: HandlerInput) => {
    let attributes = handlerInput.attributesManager.getSessionAttributes();
    if (attributes === undefined || Object.keys(attributes).length === 0) {
        attributes = {
        }
    }
    return attributes;
}


const saveSessionAttributes = (handlerInput: HandlerInput, sessionAttributes: {
    [key: string]: any}) => {
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
}


export const clearHistory = async (handlerInput: HandlerInput) => {
    const storage = await getLongTimeStorage(handlerInput);
    storage.listened = [];
    storage.started = [];
    storage.lastPlayed= undefined;
    saveLongTimeStorage(handlerInput, storage);
}

export const clearSession = async (handlerInput: HandlerInput) => {
    const session = await getLongTimeStorage(handlerInput);
    session.started = [];
    session.lastPlayed= undefined;
    saveLongTimeStorage(handlerInput, session);
}


