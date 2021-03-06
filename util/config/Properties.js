const Prop = {
    "prefix": {
        type: "string",
        default: config.prefix,
        translationKey: "CONFIG_PREFIX",
        descriptionTranslationKey: "CONFIG_PREFIX_DESCRIPTION"
    },
    "modRole": {
        type: "string",
        translationKey: "CONFIG_MODROLE",
        descriptionTranslationKey: "CONFIG_MODROLE_DESCRIPTION",
        default: "tt.bot mod"
    },
    "farewellMessage": {
        type: "string",
        translationKey: "CONFIG_FAREWELL",
        descriptionTranslationKey: "CONFIG_FAREWELL_DESCRIPTION"
    },
    "farewellChannelId": {
        type: "channel",
        translationKey: "CONFIG_FAREWELL_CHANNEL",
        descriptionTranslationKey: "CONFIG_FAREWELL_CHANNEL_DESCRIPTION"
    },
    "greetingMessage": {
        type: "string",
        translationKey: "CONFIG_GREETING",
        descriptionTranslationKey: "CONFIG_GREETING_DESCRIPTION"
    },
    "greetingChannelId": {
        type: "channel",
        translationKey: "CONFIG_GREETING_CHANNEL",
        descriptionTranslationKey: "CONFIG_GREETING_CHANNEL_DESCRIPTION"
    },
    "agreeChannel": {
        type: "channel",
        translationKey: "CONFIG_AGREE_CHANNEL",
        descriptionTranslationKey: "CONFIG_AGREE_CHANNEL_DESCRIPTION"
    },
    "memberRole": {
        type: "role",
        translationKey: "CONFIG_MEMBER_ROLE",
        descriptionTranslationKey: "CONFIG_MEMBER_ROLE_DESCRIPTION"
    },
    "logChannel": {
        type: "channel",
        translationKey: "CONFIG_LOG_CHANNEL",
        descriptionTranslationKey: "CONFIG_LOG_CHANNEL_DESCRIPTION"
    },
    "logEvents": {
        type: "string",
        translationKey: "CONFIG_LOG_EVENTS",
        descriptionTranslationKey: "CONFIG_LOG_EVENTS_DESCRIPTION"
    },
    "modlogChannel": {
        type: "channel",
        translationKey: "CONFIG_MODLOG_CHANNEL",
        descriptionTranslationKey: "CONFIG_MODLOG_CHANNEL_DESCRIPTION"
    }
};

module.exports = Prop;