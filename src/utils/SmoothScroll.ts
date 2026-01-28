export const smoothScroll = (id: string) => {
  const section = document.querySelector(`#${id}`)
  section.scrollIntoView({ behavior: 'smooth' })
}
