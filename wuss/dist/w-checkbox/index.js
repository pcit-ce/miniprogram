/*
 * @Author: Github.Caitingwei[https://github.com/Caitingwei] 
 * @Date: 2018-09-14 14:14:38 
 * @Last Modified by: Github.Caitingwei[https://github.com/Caitingwei]
 * @Last Modified time: 2019-01-26 15:49:20
 */
import WussComponent from '../common/extends/baseComponent';
import field from '../common/behavior/field';
import cell from '../common/behavior/cell';

WussComponent({
  behaviors: [cell, field],
  relations: {
    '../w-cell-group/index': {
      type: 'ancestor',
    },
    '../w-form/index': {
      type: 'ancestor',
    },
  },
  /**
   * 组件的属性列表
   * @param {string} color 颜色
   * @param {boolean} disabled 禁用
   * @param {string} title 标题
   * @param {string} direction 方向，可选值有[left/right]
   * @param {string} iconType  checkbox图标类型，可选值有[circle,box,check]
   * @param {array} [options] 传入的数组对象，参数有 label,checked,disabled
   */
  properties: {
    color: {
      type: String,
      value: '#ff8800',
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
    },
    direction: {
      type: String,
      value: 'left',
    },
    iconType: {
      type: String,
      value: 'circle',
    },
    options: {
      type: Array,
      value: [],
    },
  },
  data: {
    value: [],
    _isArrayObject: false,
  },
  methods: {
    _handleChecked(e) {
      let {
        options,
      } = this.data;
      const key = e.currentTarget.dataset.key;
      const item = options[key];
      if (item.disabled) return false;
      item.checked = !item.checked;
      this.setData({
        options,
        value: options
          .filter(i => typeof i.checked === 'boolean' && i.checked)
          .map(i => {
            let item = { ...i
            };
            delete item.checked;
            return item;
          }),
      }, () => this.triggerEvent(
        'onChange', {
          value: this.data.value,
        }, {}
      ));
    },
    _emptyValue() {
      const {
        options
      } = this.data;
      options.forEach(e => {
        if (!e.disabled) {
          delete e.checked;
        }
      });
      this.setData({
        options
      });
    },
  },
  ready: function () {
    const {
      options
    } = this.data;
    const value = options.filter(i => (i.checked === true));
    const _isArrayObject = this.isArrayObject(options);
    if (!_isArrayObject) {
      const newOptions = options.map(text => Object.assign({
        text
      }, {}));
      this.setData({
        options: newOptions,
      })
    }
    this.setData({
      _isArrayObject,
      value,
    });
  },
});