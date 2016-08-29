import constant from 'lodash/constant'
import convert from './convert'

const ipv4 = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
const ipv6 = /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/
const localhost = /^localhost$/
const domain = /^.+\.[^.]+$/
const simpleDomain = /^[^.*]+\.[^.]+$/
const noop = constant(false)

export function compile (glob) {
  // If not a valid glob, ignore it.
  if (!ipv4.test(glob) &&
      !ipv6.test(glob) &&
      !localhost.test(glob) &&
      !domain.test(glob)) {
    return noop
  }

  let regexp = convert(glob)

  // Allow all subdomains if none was specified.
  if (simpleDomain.test(glob)) {
    regexp = `(.+\\.)?${regexp}`
  }

  // Force matching the entire input against the pattern.
  regexp = new RegExp(`^${regexp}$`, 'i')

  return (url) => {
    const {protocol, hostname} = url
    return (protocol !== 'http:' && protocol !== 'https:') || regexp.test(hostname)
  }
}
