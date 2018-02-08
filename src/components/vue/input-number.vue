<template>
  <div class="input-number">
    <input type="hidden" :value="value" @input="value=$event.target.value">
    <div class="px left" v-if="pos != 'right' && !!px">{{ px }}</div>
    <input type="text" v-model="val" @keyup="checkNum()" :placeholder="placeholder">
    <div class="icon" @click="reduce()">-</div>
    <div class="icon" @click="add()">+</div>
    <div class="px" v-if="pos == 'right' && !!px">{{ px }}</div>
  </div>
</template>

<script>
  /** @vue */
  export default {
    props: {
      value: [Number, String],
      placeholder: String,
      pos: [String, Number],
      min: [String, Number],   //  最小值
      max: [String, Number],   //  最大值
      dot: [String, Number],  //  小数点后的位数，不传则不限制
      px: {   //  单位
        type: String,
        default: '￥'
      }
    },
    data () {
      return {
        val: '',
        has_min: this.min && this.min.toString() !== '',
        has_max: this.max && this.max.toString() !== ''
      }
    },
    mounted () {
      if(typeof this.value === 'string') {
        this.$emit('input', parseFloat(this.value))
        this.$emit('change', parseFloat(this.value))
      }
      this.val = this.value
    },
    methods: {
      reduce () {
        let data = parseFloat(this.val)
        if(isNaN(data)) {
          if(this.has_min) {
            this.val = Math.max(-1, this.min)
          }else {
            this.val = -1
          }
        }else {
          if(this.has_min && this.min > (data - 1)) {
            this.val = this.min
          }else {
            this.val = data - 1
          }
        }


      //  this.val = isNaN(data) ? (this.has_min && this.min > (data - 1) ? this.min : -1) : data - 1
      },
      add () {
        let data = parseFloat(this.val)
        if(isNaN(data)) {
          if(this.has_max) {
            this.val = Math.min(1, this.max)
          }else {
            this.val = 1
          }
        }else {
          if(this.has_max && this.max < (data + 1)) {
            this.val = this.max
          }else {
            this.val = data + 1
          }
        }
       // this.val = isNaN(data) ? (this.has_max && this.max < (data + 1) ? this.max : 1) : data + 1
      },
      checkNum () {
        let dot = parseInt(this.dot)
        let val = this.val.toString()
        if(!isNaN(parseFloat(val))) {  //  是有效数字
          let pos = val.indexOf('.')
          if(dot >= 0) {
            if(pos > 0) { // 输入的有小数点
              this.val = val.substr(0, dot === 0 ? pos : pos+1+dot)
            }else {
              this.val = parseFloat(val)
            }
          }
        }else {
          this.val = ''
        }
        if(this.has_min && parseFloat(this.val) < parseFloat(this.min)) {
          this.val = this.min
        }
        if(this.has_max && parseFloat(this.val) > parseFloat(this.max)) {
          this.val = this.max
        }
      }
    },
    watch: {
      val (val) {
        this.$emit('input', parseFloat(val))
        this.$emit('change', parseFloat(val))
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .input-number {
    display: flex;
    width: 170px;
    border: 1px solid #bfcbd9;
    line-height: 28px;
    border-radius: 2px;
    input {
      flex: 1;
      border: 0;
      width: auto;
      min-width: 0;
      padding: 0 5px;
    }
    .icon, .px {
      border-left: 1px solid #bfcbd9;
      color: #97a8be;
      cursor: pointer;
      text-align: center;
    }
    .px.left {
      border-right: 1px solid #bfcbd9;
      border-left: 0;
    }
    .icon {
      width: 25px;
      font-size: 22px;
    }
    .px {
      min-width: 25px;
      font-size: 14px;
      background: #fbfdff;
      padding: 0 2px;
    }
  }
</style>
