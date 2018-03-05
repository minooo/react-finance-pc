module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: 'dudu_finance_web',
            script: 'server.js',
            env: {
                NODE_ENV: 'production'
            },
            instances: 0,
            exec_mode: 'cluster'
        }
    ]
}
