import { useLottie } from 'lottie-react'
import { useEffect } from 'react'

import { useInView } from 'react-intersection-observer'
import { LottieWrapperInfo } from 'types'

const LottieWrapper = (props: LottieWrapperInfo) => {
  const { ref, inView } = useInView({
    threshold: 0
  })

  const options = {
    animationData: props.lottie,
    loop: true,
    autoplay: true,
    className: props.className
  }

  const { View, play, pause } = useLottie(options as any)

  useEffect(() => {
    inView ? play() : pause()
  }, [inView])

  useEffect(() => {
    window.addEventListener('blur', pause)
    window.addEventListener('focus', play)
    return () => {
      window.removeEventListener('blur', pause)
      window.removeEventListener('focus', play)
    }
  }, [])

  return (
    <div className="flex justify-center" ref={ref}>
      {View}
    </div>
  )
}

export default LottieWrapper
