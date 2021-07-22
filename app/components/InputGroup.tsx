import classNames from 'classnames'
import { forwardRef, InputHTMLAttributes } from 'react'

interface InputGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  label?: string
  validationMessage?: string
}

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  function InputGroup({ label, className, validationMessage, ...props }, ref) {
    return (
      <label className={classNames('input-group', className)}>
        <span>{label}</span>
        <input
          {...props}
          className={validationMessage ? 'invalid' : ''}
          ref={ref}
        />
        {validationMessage && (
          <p className="text-xs mt-1 text-red-600">{validationMessage}</p>
        )}
      </label>
    )
  }
)

export default InputGroup
