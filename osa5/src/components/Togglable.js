import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props,ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
      }

      useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
      })

  return(
    <div>
    <div style={hideWhenVisible}>
       <button onClick={toggleVisibility}>{props.buttonLabelOpen}</button>
    </div>
    <div style={showWhenVisible}>
    {props.children}
    <button onClick={toggleVisibility}>{props.buttonLabelClose}</button>
    </div>
  </div>
  )
})

export default Togglable