'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = PanelLayers;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _panel = require('./panel');

var _panel2 = _interopRequireDefault(_panel);

var _eye = require('react-icons/lib/fa/eye');

var _eye2 = _interopRequireDefault(_eye);

var _eyeSlash = require('react-icons/lib/fa/eye-slash');

var _eyeSlash2 = _interopRequireDefault(_eyeSlash);

var _plus = require('react-icons/lib/ti/plus');

var _plus2 = _interopRequireDefault(_plus);

var _pencil = require('react-icons/lib/fa/pencil');

var _pencil2 = _interopRequireDefault(_pencil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE_ADD_WRAPPER = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  padding: "0px 15px"
};

var STYLE_ADD_LABEL = {
  fontSize: "10px",
  marginLeft: "5px"
};

var STYLE_EDIT_BUTTON = {
  cursor: "pointer",
  marginLeft: "5px",
  border: "0px",
  background: "none",
  color: "#fff",
  fontSize: "14px",
  outline: "0px"
};

var iconColStyle = { width: '2em' };
var tableStyle = {
  width: '100%',
  cursor: 'pointer',
  overflowY: 'scroll',
  maxHeight: '20em',
  display: 'block',
  padding: '0 1em',
  marginLeft: '1px'
};

function PanelLayers(_ref, _ref2) {
  var _ref$state = _ref.state,
      scene = _ref$state.scene,
      mode = _ref$state.mode;
  var sceneActions = _ref2.sceneActions,
      translator = _ref2.translator;


  var addClick = function addClick(event) {
    sceneActions.addLayer();
    event.stopPropagation();
  };

  return _react2.default.createElement(
    _panel2.default,
    { name: translator.t("Layers") },
    _react2.default.createElement(
      'table',
      { style: tableStyle },
      _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement('th', { colSpan: '2' }),
          _react2.default.createElement(
            'th',
            null,
            translator.t("Altitude")
          ),
          _react2.default.createElement(
            'th',
            null,
            translator.t("Name")
          )
        )
      ),
      _react2.default.createElement(
        'tbody',
        null,
        scene.layers.entrySeq().map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              layerID = _ref4[0],
              layer = _ref4[1];

          var selectClick = function selectClick(e) {
            return sceneActions.selectLayer(layerID);
          };
          var configureClick = function configureClick(e) {
            return sceneActions.openLayerConfigurator(layer.id);
          };

          var swapVisibility = function swapVisibility(e) {
            sceneActions.setLayerProperties(layerID, { visible: !layer.visible });
            e.stopPropagation();
          };

          var isCurrentLayer = layerID === scene.selectedLayer;
          var eyeStyle = !layer.visible ? { fontSize: '1.25em', color: "#a5a1a1" } : { fontSize: '1.25em' };

          return _react2.default.createElement(
            'tr',
            { key: layerID, onClick: selectClick, onDoubleClick: configureClick },
            _react2.default.createElement(
              'td',
              { style: iconColStyle },
              !isCurrentLayer ? _react2.default.createElement(_eye2.default, { onClick: swapVisibility, style: eyeStyle }) : null
            ),
            _react2.default.createElement(
              'td',
              { style: iconColStyle },
              _react2.default.createElement(_pencil2.default, { onClick: configureClick, style: STYLE_EDIT_BUTTON, title: translator.t("Configure layer") })
            ),
            _react2.default.createElement(
              'td',
              { style: { width: '6em', textAlign: 'center' } },
              '[ h : ',
              layer.altitude,
              ' ]'
            ),
            _react2.default.createElement(
              'td',
              null,
              layer.name
            )
          );
        })
      )
    ),
    _react2.default.createElement(
      'div',
      { style: STYLE_ADD_WRAPPER, onClick: addClick },
      _react2.default.createElement(_plus2.default, null),
      _react2.default.createElement(
        'span',
        { style: STYLE_ADD_LABEL },
        translator.t("New layer")
      )
    )
  );
}

PanelLayers.propTypes = {
  state: _react.PropTypes.object.isRequired
};

PanelLayers.contextTypes = {
  sceneActions: _react.PropTypes.object.isRequired,
  translator: _react.PropTypes.object.isRequired
};