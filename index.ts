import * as AWS from 'aws-sdk';
import { SkillBuilders } from 'ask-sdk';
import { RequestEnvelope, ResponseEnvelope } from 'ask-sdk-model';
import { IntentHandler, CustomErrorHandler } from './src/IntentHandler';
import { AudioHandler } from './src/AudioHandler';
import { RadioRequestHandler } from './src/utils/RadioRequestHandler';
import { SkillEventHandler } from './src/SkillEventHandler';
import { CheckAudioInterfaceHandler } from './src/CanPlayAudioCheck';

import { Constants } from './src/Constants';

export async function handler(event: RequestEnvelope, context: any, callback: any): Promise<void> {

    const factory = SkillBuilders.standard()
        .addRequestHandlers(
            CheckAudioInterfaceHandler,
            new SkillEventHandler(),
            RadioRequestHandler.builder()
                .withHandlers(IntentHandler)
                .withHandlers(AudioHandler)
                .build()
        ).addErrorHandlers(CustomErrorHandler)
        .withAutoCreateTable(true)
        .withTableName(Constants.listened.databaseTable);

    if (process.env.useLocalDB) {
        const ddbClient = new AWS.DynamoDB({
            endpoint: 'http://localhost:8000'
        });

        factory.withDynamoDbClient(ddbClient);
    }

    const skill = factory.create();

    try {

        console.log(JSON.stringify(event, null, 2));

        const responseEnvelope: ResponseEnvelope = await skill.invoke(event, context);

        console.log(JSON.stringify(responseEnvelope, null, 2));

        return callback(null, responseEnvelope);

    } catch (error) {
        console.log(JSON.stringify(error, null, 2));
        return callback(error);
    }
}