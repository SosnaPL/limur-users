import LottieWrapper from './LottieWrapper'
import Loader from 'assets/loader.json'

const SuspenseLoader = () => (
  <div className="suspense">
    <LottieWrapper lottie={Loader} className={'h-52 w-52'} />
  </div>
)

export default SuspenseLoader
