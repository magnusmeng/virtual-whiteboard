import classNames from 'classnames'
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState,
} from 'react'

interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onClick'
  > {
  secondary?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any | Promise<any>
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  secondary = false,
  className,
  children,
  isLoading: defaultIsLoading = false,
  onClick,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(defaultIsLoading)

  useEffect(() => {
    setIsLoading(defaultIsLoading)
  }, [defaultIsLoading])

  return (
    <button
      className={classNames(
        secondary ? 'button-secondary' : 'button',
        className
      )}
      {...props}
      onClick={(e) => {
        if (!onClick) return
        setIsLoading(true)
        Promise.resolve(onClick(e)).finally(() => {
          setIsLoading(false)
        })
      }}
      disabled={isLoading}
    >
      {isLoading && <span className="button-spinner" />}
      <span className={classNames(isLoading && 'opacity-0')}>{children}</span>
    </button>
  )
}

export default Button
