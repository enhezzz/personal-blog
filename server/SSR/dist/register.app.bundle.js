exports.ids = ["register"];
exports.modules = {

/***/ "./node_modules/_babel-loader@8.0.4@babel-loader/lib/index.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/index.js?!./src/views/Register.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_babel-loader@8.0.4@babel-loader/lib!./node_modules/_vue-loader@15.4.2@vue-loader/lib??vue-loader-options!./src/views/Register.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ "./node_modules/_nprogress@0.2.0@nprogress/nprogress.js");
/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    if (window) nprogress__WEBPACK_IMPORTED_MODULE_0___default.a.start();
    next(function (vm) {
      if (window) nprogress__WEBPACK_IMPORTED_MODULE_0___default.a.done();
    });
  },
  methods: {
    register: function register(e) {
      var _this = this;

      this.valid = this.validate(this.username, this.account, this.phone, this.password);
      console.log(this.valid);
      if (this.valid.some(function (valid) {
        return !valid;
      })) return;
      var request = new Request('/register');
      var formData = new FormData();
      formData.append('username', this.username);
      formData.append('account', this.account);
      formData.append('phone', this.phone);
      formData.append('password', this.password);
      fetch(request, {
        method: 'POST',
        body: formData
      }).then(function (response) {
        var status = response.status;

        if (status == 200) {
          alert('注册成功');

          _this.$router.push('/login');
        } else if (status == 403) {
          alert('账号已存在');
        }
      });
    },
    validate: function validate() {
      //options = [username,account,phone,password]
      // let usernameExp = /.+/,
      //     accountExp = /\w+@\w+\.com/,
      //     phoneExp = /\d{11}/,
      //     passwordExp = /.+/;
      var exps = [/.+/, /\w+@\w+\.com/, /\d{11}/, /.+/];

      for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
        options[_key] = arguments[_key];
      }

      return options.map(function (option, index) {
        return exps[index].test(option);
      });
    }
  },
  data: function data() {
    return {
      username: '',
      account: '',
      phone: '',
      password: '',
      valid: [true, true, true, true]
    };
  }
});

/***/ }),

/***/ "./node_modules/_css-loader@1.0.1@css-loader/index.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/index.js?!./src/views/Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_css-loader@1.0.1@css-loader!./node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib??vue-loader-options!./src/views/Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js */ "./node_modules/_css-loader@1.0.1@css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.register[data-v-63ae9146]{\r\n    margin-top: 138px;\r\n    justify-content: center\n}\n.register-body[data-v-63ae9146]{\r\n    text-align: left;\n}\n.invalid-feedback[data-v-63ae9146]{\r\n    display: block;\n}\r\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_vue-loader@15.4.2@vue-loader/lib/index.js?!./src/views/Register.vue?vue&type=template&id=63ae9146&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_vue-loader@15.4.2@vue-loader/lib??vue-loader-options!./src/views/Register.vue?vue&type=template&id=63ae9146&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "register row animated zoomInDown" }, [
    _vm._ssrNode(
      '<div class="col-5" data-v-63ae9146><div class="register-header" data-v-63ae9146><h3 class="animated tada infinited" data-v-63ae9146>register...</h3></div> <div class="register-body" data-v-63ae9146><div class="form-group" data-v-63ae9146><label for="username" data-v-63ae9146>Username:</label> <input type="text" placeholder="用户名" id="username" name="username"' +
        _vm._ssrAttr("value", _vm.username) +
        ' class="form-control" data-v-63ae9146> ' +
        (!this.valid[0]
          ? '<div class="invalid-feedback" data-v-63ae9146>\n                    用户名不能为空\n                </div>'
          : "<!---->") +
        '</div> <div class="form-group" data-v-63ae9146><label for="email" data-v-63ae9146>Email:</label> <input type="email" placeholder="账号(用做登录号)" id="email" name="email"' +
        _vm._ssrAttr("value", _vm.account) +
        ' class="form-control" data-v-63ae9146> ' +
        (!this.valid[1]
          ? '<div class="invalid-feedback" data-v-63ae9146>\n                    邮箱格式不正确\n                </div>'
          : "<!---->") +
        '</div> <div class="form-group" data-v-63ae9146><label for="phone" data-v-63ae9146>Phone:</label> <input type="text" placeholder="手机号" id="phone" name="phone"' +
        _vm._ssrAttr("value", _vm.phone) +
        ' class="form-control" data-v-63ae9146> ' +
        (!this.valid[2]
          ? '<div class="invalid-feedback" data-v-63ae9146>\n                    输入11位手机号\n                </div>'
          : "<!---->") +
        '</div> <div class="form-group" data-v-63ae9146><label for="password" data-v-63ae9146>Password:</label> <input type="password" placeholder="密码" id="password" name="password"' +
        _vm._ssrAttr("value", _vm.password) +
        ' class="form-control" data-v-63ae9146> ' +
        (!this.valid[3]
          ? '<div class="invalid-feedback" data-v-63ae9146>\n                    密码不能为空\n                </div>'
          : "<!---->") +
        '</div> <button type="submit" class="btn btn-primary" data-v-63ae9146>register</button></div></div>'
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/index.js!./node_modules/_css-loader@1.0.1@css-loader/index.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/index.js?!./src/views/Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/_vue-style-loader@4.1.2@vue-style-loader!./node_modules/_css-loader@1.0.1@css-loader!./node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib??vue-loader-options!./src/views/Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/_css-loader@1.0.1@css-loader!../../node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/_vue-loader@15.4.2@vue-loader/lib??vue-loader-options!./Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css& */ "./node_modules/_css-loader@1.0.1@css-loader/index.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/index.js?!./src/views/Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css&");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(/*! ../../node_modules/_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesServer.js */ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/lib/addStylesServer.js").default
module.exports.__inject__ = function (context) {
  add("04040520", content, false, context)
};

/***/ }),

/***/ "./src/views/Register.vue":
/*!********************************!*\
  !*** ./src/views/Register.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Register_vue_vue_type_template_id_63ae9146_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=63ae9146&scoped=true& */ "./src/views/Register.vue?vue&type=template&id=63ae9146&scoped=true&");
/* harmony import */ var _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js& */ "./src/views/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_15_4_2_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/_vue-loader@15.4.2@vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/_vue-loader@15.4.2@vue-loader/lib/runtime/componentNormalizer.js");



function injectStyles (context) {
  
  var style0 = __webpack_require__(/*! ./Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css& */ "./src/views/Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css&")
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(_node_modules_vue_loader_15_4_2_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_vue_vue_type_template_id_63ae9146_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Register_vue_vue_type_template_id_63ae9146_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  injectStyles,
  "63ae9146",
  "489636b0"
  
)

component.options.__file = "src/views/Register.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/views/Register.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/views/Register.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_8_0_4_babel_loader_lib_index_js_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/_babel-loader@8.0.4@babel-loader/lib!../../node_modules/_vue-loader@15.4.2@vue-loader/lib??vue-loader-options!./Register.vue?vue&type=script&lang=js& */ "./node_modules/_babel-loader@8.0.4@babel-loader/lib/index.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/index.js?!./src/views/Register.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_8_0_4_babel_loader_lib_index_js_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/views/Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css&":
/*!*****************************************************************************************!*\
  !*** ./src/views/Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_node_modules_vue_loader_15_4_2_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_id_63ae9146_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/_vue-style-loader@4.1.2@vue-style-loader!../../node_modules/_css-loader@1.0.1@css-loader!../../node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/_vue-loader@15.4.2@vue-loader/lib??vue-loader-options!./Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css& */ "./node_modules/_vue-style-loader@4.1.2@vue-style-loader/index.js!./node_modules/_css-loader@1.0.1@css-loader/index.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/stylePostLoader.js!./node_modules/_vue-loader@15.4.2@vue-loader/lib/index.js?!./src/views/Register.vue?vue&type=style&index=0&id=63ae9146&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_node_modules_vue_loader_15_4_2_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_id_63ae9146_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_node_modules_vue_loader_15_4_2_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_id_63ae9146_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_node_modules_vue_loader_15_4_2_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_id_63ae9146_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_node_modules_vue_loader_15_4_2_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_id_63ae9146_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_4_1_2_vue_style_loader_index_js_node_modules_css_loader_1_0_1_css_loader_index_js_node_modules_vue_loader_15_4_2_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_style_index_0_id_63ae9146_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/views/Register.vue?vue&type=template&id=63ae9146&scoped=true&":
/*!***************************************************************************!*\
  !*** ./src/views/Register.vue?vue&type=template&id=63ae9146&scoped=true& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_15_4_2_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_63ae9146_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/_vue-loader@15.4.2@vue-loader/lib??vue-loader-options!./Register.vue?vue&type=template&id=63ae9146&scoped=true& */ "./node_modules/_vue-loader@15.4.2@vue-loader/lib/loaders/templateLoader.js?!./node_modules/_vue-loader@15.4.2@vue-loader/lib/index.js?!./src/views/Register.vue?vue&type=template&id=63ae9146&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_15_4_2_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_63ae9146_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_15_4_2_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_15_4_2_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_63ae9146_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

};;
//# sourceMappingURL=register.app.bundle.js.map