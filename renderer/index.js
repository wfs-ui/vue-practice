function createRenderer(options) {

  const { createElement, setElementText, insert, patchProps } = options
  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container)
    } else {
      if (container._vnode) {
        unmount(container._vnode)
      }
    }
    container._vnode = vnode
  }

  function patch(oldVNode, newVNode, container) {
    // 处理新旧vnode 类型完全不同的情况
    if(oldVNode && oldVNode.type !== newVNode.type) {
      unmount(oldVNode)
      oldVNode = null
    }

    const { type } = newVNode

    if (typeof type === 'string') {
      // 判断是旧 旧vnode不存在则代表是挂载
      if (!oldVNode) {
        mountElement(newVNode, container)
      } else {
        // patchElement(n1, n2)
      }
    } else if (typeof type === 'object') {
      // newVnode.type的值是对象，则它描述的是组件
    } else if (type === 'xxx') {

    }
  }

  function shouldSetAsProps(el, key, value) {
    if (key === 'form' && el.tagName === 'INPUT')
      return false
    return key in el
  }

  function mountElement(vnode, container) {
    // 新建node.type DOM 元素
    const element = vnode.el = createElement(vnode.type)
    // 判断children是否为字符串
    if (typeof vnode.children === 'string') {
      setElementText(element, vnode.children)
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => {
        patch(null, child, element)
      })
    }

    if (vnode.props) {
      for (const key in vnode.props) {
        patchProps(element, key, null, vnode.props[key])
      }
    }
    // 将DOM元素添加到容器中
    insert(element, container)
  }

  function unmount(vnode) {
    const el = vnode.el
    const parent = el.parentNode
    if (parent) {
      parent.removeChild(el)
    }
  }

  return {
    render
  }
}