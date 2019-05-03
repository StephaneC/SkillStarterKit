import { getOne, audioFormat } from './utils/utils';

export const sortInvers = ["amzn1.ask.skill.0650acb4-0a73-4e36-a119-956b955e802d"];
export const Constants = {
    urls : {
        // Europe 1 - l'evoln
        "amzn1.ask.skill.faf07da0-4edc-4408-82d6-7f40c69d2776": "https://www.europe1.fr/rss/podcasts/lenvol.xml",
        // RFM Music Story:
        "amzn1.ask.skill.650611f3-a165-475e-9ae3-ccfeee1c9312": "https://cdn-rfm.lanmedia.fr/var/exports/podcasts/sound/Music%20Story",
        // RFM le bret du faux
        "amzn1.ask.skill.a83012ae-d92e-45b0-97c2-ba62f2bf687a": "https://cdn-rfm.lanmedia.fr/var/exports/podcasts/sound/le-bret-du-faux.xml",
        // RFM les études de marion
        "amzn1.ask.skill.a49ed709-0ccf-48dc-beb3-a02e2d15bfc5": "https://cdn3-rfm.ladmedia.fr/var/exports/podcasts/sound/Le-saviez-vous-Marion.xml%20%20%20?260-feb8f75eb192a3649d152393b97307c06948693c",
        // au coeur de l'histoire
        "amzn1.ask.skill.8f468c70-0c27-48e4-a4a8-cd751d6fc54b": "http://cdn-europe1.new2.ladmedia.fr/var/exports/podcasts/sound/au-coeur-de-l-histoire.xml",
        // itw pascal nègre
        "amzn1.ask.skill.2baef67e-b6df-4d99-8dd3-22d6d1568bce": "https://cdn2-rfm.ladmedia.fr/var/exports/podcasts/sound/pascal-negre-fait-ses-numeros.xml",
        // Nos présidents dans la tourmente
        "amzn1.ask.skill.0650acb4-0a73-4e36-a119-956b955e802d": "http://cdn-europe1.new2.ladmedia.fr/var/exports/podcasts/sound/nos-presidents-dans-la-tourmente.xml"

    },
    messages: {
        PLAYBACK_FAILED: "J'ai rencontré une erreur sur un podcast. Je passe au suivant",
        UNHANDLED_MSG: "Une erreur c'est produite.",
        not_supported: "Ce périphérique ne supporte pas cette skill",
        HISTORY_CLEARED: 'L\'historique d\'écoute a été supprimé. Reprenons.', 
        RESUME_MSG: 'Nous reprenons',
        PAUSE_MSG: 'Très bien, Vous pourrez reprendre le podcast en disant "Alexa, reprend"',
        ASK_NEXT: 'Souhaitez-vous écouter le podcast suivant?',
        STOP_MSG: 'https://s3.eu-west-3.amazonaws.com/rfm-sounds/A_BIENTOT.mp3',
        NO_PREVIOUS: 'Aucun podcast précédent trouvé. Avez vous essayé suivant?',
        NEXT_PODCAST: 'Voici le podcast suivant:',
        PREVIOUS_PODCAST: 'Voici le podcast précédent',
        PODCAST_FINISHED: 'Le podcast est terminé. Souhaitez vous écouter le suivant?',
        RANDOM: 'Voici un podcast choisi en aléatoire',
        "amzn1.ask.skill.faf07da0-4edc-4408-82d6-7f40c69d2776": {
            WELCOME: 'Bienvenue dans l\'Envol',
            NO_EMISSION: 'Aucun podcast trouvé. Si vous les avez tous écoutés, dites \'Alexa, demande à l\'Envol le podcast de vider mon historique\'',
            HELP_MSG: 'Avec cette skill, écoutez les podcasts de "l\'Envol". Vous pouvez à tout moment passer au podcast suivant, via la commande Alexa, suivant.'
        },
        "amzn1.ask.skill.0650acb4-0a73-4e36-a119-956b955e802d": {
            WELCOME: 'Bienvenue dans Nos présidents dans la tourmente',
            HELP_MSG: 'Avec cette skill, écoutez les podcasts de "Nos présidents dans la tourmente". Vous pouvez à tout moment passer au podcast suivant, via la commande Alexa, suivant.',
            NO_EMISSION: 'Aucun podcast trouvé. Si vous les avez tous écoutés, dites \'Alexa, demande à Nos présidents dans la tourment de vider mon historique\'',
        },
        'amzn1.ask.skill.650611f3-a165-475e-9ae3-ccfeee1c9312': {
            WELCOME: 'https://s3.eu-west-3.amazonaws.com/rfm-sounds/MUSIC_STORY.mp3',
            HELP_MSG: 'Avec cette skill, écoutez les podcasts de Music Story. Vous pouvez à tout moment passer au podcast suivant, via la commande Alexa, suivant.',
            NO_EMISSION: 'Aucun podcast trouvé. Si vous les avez tous écoutés, dites \'Alexa, demande à Music Story de vider mon historique\'',
        },
        'amzn1.ask.skill.a83012ae-d92e-45b0-97c2-ba62f2bf687a': {
            WELCOME: 'https://s3.eu-west-3.amazonaws.com/rfm-sounds/BRET_DU_FAUX.mp3',
            HELP_MSG: 'Avec cette skill, écoutez les podcasts de Le Bret du Faux. Vous pouvez à tout moment passer au podcast suivant, via la commande Alexa, suivant.',
            NO_EMISSION: 'Aucun podcast trouvé. Si vous les avez tous écoutés, dites \'Alexa, demande à Le Bret du Faux\' de vider mon historique',
        },
        'amzn1.ask.skill.a49ed709-0ccf-48dc-beb3-a02e2d15bfc5': {
            WELCOME: 'https://s3.eu-west-3.amazonaws.com/rfm-sounds/ETUDES_DE_MARION.mp3',
            HELP_MSG: 'Avec cette skill, écoutez les podcasts de les études de Marion. Vous pouvez à tout moment passer au podcast suivant, via la commande Alexa, suivant.',
            NO_EMISSION: 'Aucun podcast trouvé. Si vous les avez tous écoutés, dites \'Alexa, demande à les études de Marion\' de vider mon historique',
        },
        'amzn1.ask.skill.8f468c70-0c27-48e4-a4a8-cd751d6fc54b': {
            WELCOME: 'Bonjour et bienvenue dans Au cœur de l’histoire, présenté par Fabrice D’Almeida',
            ASK_NEXT: 'Souhaitez-vous écouter le récit suivant?',
            HELP_MSG: 'Avec cette skill, écoutez les podcasts de Au coeur de l\'histoire. Vous pouvez à tout moment passer au podcast suivant, via la commande Alexa, suivant.',
            STOP_MSG: 'Merci et à bientôt sur Au coeur de l\'histoire',
            NO_PREVIOUS: 'Aucun récit précédent trouvé. Avez vous essayé suivant?',
            NO_NEXT: 'Aucun podcast suivant trouvé. Avez vous essayé précédent?',
            NEXT_PODCAST: 'Voici le récit suivant',
            PREVIOUS_PODCAST: 'Voici le récit précédent',
            NO_EMISSION: 'Aucun podcast trouvé. Si vous les avez tous écoutés, dites \'Alexa, demande à Au cœur de l\'histoire\' de vider mon historique',
            PODCAST_FINISHED: 'Le récit est terminé. Souhaitez vous écouter le récit suivant?',
            NO_MORE_PODCASTS: 'Vous avez écoutez tous nos récits. Revenez vite!',
            RANDOM: 'Voici un récit choisi en aléatoire'
        },
        'amzn1.ask.skill.2baef67e-b6df-4d99-8dd3-22d6d1568bce': {
            WELCOME: 'Bonjour et bienvenue dans L’invité de Pascal Nègre.',
            ASK_NEXT: 'Souhaitez-vous écouter l\'interview suivante',
            HELP_MSG: 'La skill Interview de Pascal Nègre vous permet d\'accéder rapidement à l\'ensemble des podcasts de cette émission. Dites "histoire suivantes" pour passer à l\'histoire suivante. Pour ré-écouter une histoire vider votre historique d\'écoute en disant: "Vider mon historique"',
            STOP_MSG: 'Retrouvez de nouvelles interviews chaque semaine. A bientôt',
            NO_PREVIOUS: 'Aucun podcast précédent trouvé. Avez vous essayé suivant?',
            NO_NEXT: 'Aucun podcast suivant trouvé. Avez vous essayé précédent?',
            NEXT_PODCAST: 'Voici l\interview suivante',
            PREVIOUS_PODCAST: 'Voici l\interview précédente',
            NO_EMISSION: 'Aucun podcast trouvé. Si vous les avez tous écoutés, dites \'Alexa, demande à L\'invité de Pascal Nègre de vider mon historique',
            PODCAST_FINISHED: 'Le podcast est terminé. Souhaitez vous écouter l\'interview suivante?',
            NO_MORE_PODCASTS: 'Vous avez écoutez toutes nos interviews. Revenez vite!',
            RANDOM: 'Voici une histoire choisie en aléatoire'
        }
    },
    listened: {
        databaseTable: 'SkillPodcasts'
    }
}

export const getMessage = (applicationId, key, raw = false): string => {
    let rawMsg;
    if (Constants.messages[applicationId] && Constants.messages[applicationId][key]) {
        rawMsg = Constants.messages[applicationId][key];
    } else {
        rawMsg = Constants.messages[key];
    }

    let msg;
    if (rawMsg instanceof Array) {
        msg = getOne(rawMsg);
    } else {
        msg = rawMsg;
    }

    if (! raw && msg && msg.startsWith('http')) {
        return audioFormat(msg);
    }
    return msg;
}
