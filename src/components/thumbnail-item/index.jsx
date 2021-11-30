import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import twemoji from 'twemoji'
import './index.scss'

export const ThumbnailItem = ({ node }) => {
  const emoji = node.frontmatter.emoji
  return (
    <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
      <div key={node.fields.slug}>
        <h3>
          {node.frontmatter.title || node.fields.slug}
          <span className="date">{node.frontmatter.date}</span>
        </h3>

        <div className="excerpt">
          <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          <div
            className="emoji-box"
            dangerouslySetInnerHTML={{
              __html: twemoji.parse(emoji || '🧸', {
                folder: 'svg',
                ext: '.svg',
              }),
            }}
          ></div>
        </div>
      </div>
    </Link>
  )
}
