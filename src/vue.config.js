module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /.csv$/,
                    loader: 'csv-loader'
                }
            ]
        }
    }
}