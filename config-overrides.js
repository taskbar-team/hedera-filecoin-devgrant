const webpack = require('webpack');
const fs = require('fs');

const getContracts = (path) => {
    return fs.readdirSync(path).filter(file => file.endsWith('.sol'));
}

module.exports = {
    webpack: function (config, env) {

        config.plugins.push(
            new webpack.DefinePlugin({
                Contracts: JSON.stringify(getContracts('./contracts'))
            })
        )

        return config;
    }
}