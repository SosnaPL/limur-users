import React from 'react'

export const Show = (props: { when: any; fallback?: React.ReactNode; children: React.ReactNode }) =>
  props.when ? props.children : props.fallback || null

export default Show
