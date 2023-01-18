const missingSetting = "Warning: No value set for this enviroment variable";

const config = {
    "PORT": process.env.PORT || missingSetting,
    "SESSION_SECRET": process.env.SESSION_SECRET || missingSetting,
    "CLIENT_GITHUB_ID": process.env.CLIENT_GITHUB_ID || missingSetting,
    "CLIENT_GITHUB_SECRET": process.env.CLIENT_GITHUB_SECRET || missingSetting,
    "CLIENT_GITHUB_CALLBACK": process.env.CLIENT_GITHUB_SECRET || missingSetting,
}

export default config;
