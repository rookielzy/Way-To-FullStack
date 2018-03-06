import React, { Component } from 'react'
import styled from 'styled-components'

const ConnectionElm = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`

export default class Connections extends Component {
  render () {
    const { paths } = this.props
    return (
      <ConnectionElm>
        {
          paths.map((path, idx) => {
            const { src, tgt } = path
            let elm = null
            
            if (src.left === tgt.left) {
              elm = <line
                key={'p' + src.left + '-' + src.top + '-' + idx}
                x1={src.left} y1={src.top + 25} x2={tgt.left} y2={tgt.top}
                fill={'none'}
                stroke={'#3d3d3d'}
                strokeWidth={2}
              />
            } else {
              let p1, p2, c1, c2
              
              if (src.left < tgt.left) {
                p1 = {
                  x: src.left,
                  y: src.top + 12.5
                }
                p2 = {
                  x: tgt.left,
                  y: tgt.top + 12.5
                }
                c1 = {
                  x: p1.x + 45,
                  y: p1.y
                }
                c2 = {
                  x: p2.x - 45,
                  y: p2.y
                }
              } else {
                p1 = {
                  x: src.left,
                  y: src.top + 12.5
                }
                p2 = {
                  x: tgt.left,
                  y: tgt.top + 12.5
                }
                c1 = {
                  x: p1.x - 45,
                  y: p1.y
                }
                c2 = {
                  x: p2.x + 45,
                  y: p2.y
                }
              }

              let pathStr = `M${p1.x},${p1.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`
              elm = <path
                key={'p' + src.left + '-' + src.top + '-' + idx}
                d={pathStr}
                fill={'node'}
                stroke={'#3d3d3d'}
                strokeWidth={2}
              />
            }

            return elm
          })
        }
      </ConnectionElm>
    )
  }
}
