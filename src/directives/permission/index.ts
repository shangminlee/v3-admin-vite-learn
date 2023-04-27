import { DirectiveBinding, type Directive } from "vue";


/** 权限指令 */
export const permission: Directive = {
  mounted: (el: any, binding: DirectiveBinding) => {
    const { value } = binding

  }
}
