module.exports = {
  presets: [
    process.env.ssr?"@babel/preset-env":'@vue/app'
  ],
    "plugins": process.env.ssr?["@babel/plugin-syntax-dynamic-import"]: []
}
