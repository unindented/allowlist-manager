import constant from 'lodash/constant'
import convert from './convert'

const validDomain = /^.+\.[^.]+$/
const simpleDomain = /^[^.*]+\.[^.]+$/
const noop = constant(true)

export function compile (glob) {
  // If not a valid glob, ignore it.
  if (!validDomain.test(glob)) {
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
