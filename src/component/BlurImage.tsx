import { useEffect, useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  // small blurred placeholder (base64 or tiny jpg/png path)
  placeholder?: string
}

export default function BlurImage({ src, alt, className, placeholder }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setLoaded(true)
  }, [src])

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {/* Placeholder */}
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover scale-105 blur-2xl transition-opacity duration-500 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}

      {/* Main */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover transition duration-700 ${
          loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105'
        }`}
      />
    </div>
  )
}
