import BLOG from '@/blog.config'
import Link from 'next/link'
import NotionIcon from './NotionIcon'
import { useRouter } from 'next/router'
import React from 'react'

const BlogPostCard = ({ post, className }) => {
  const router = useRouter()
  const currentSelected = router.asPath.split('?')[0] === '/' + post.slug
  const pageIcon = post.pageIcon.indexOf("amazonaws.com")!=-1 ? post.pageIcon+"&width=88" : post.pageIcon
  return (
    <Link href={`${removeHttp(post.slug)}`} target={(checkRemoveHttp(post.slug) ? '_blank' : '_self')} passHref>
        <div key={post.id} className={`${className} h-full rounded-lg p-4 dark:bg-neutral-800 cursor-pointer bg-white hover:bg-white rounded-2xl dark:hover:bg-gray-800 ${currentSelected ? 'bg-green-50 text-green-500' : ''}`}>
                <div className="stack-entry w-full flex space-x-3 select-none dark:text-neutral-200">
                    <NotionIcon icon={pageIcon} size='10' className='text-6xl w-11 h-11 mx-1 my-0 flex-none' />
                    <div className="stack-comment flex-auto">
                        <p className="title font-bold">{post.title}</p>
                        <p className="description font-normal">{post.summary ? '' : '暂无简介'}</p>
                    </div>
                </div>
        </div>
    </Link>
  )
  function removeHttp(str) {
    // 检查字符串是否包含http
    if (str.includes("url-")) {
      // 如果包含，找到http的位置
      let index = str.indexOf("url-");
      // 返回http之后的部分
      return "https://"+str.slice(index+"url-".length, str.length);
    } else {
      // 如果不包含，返回原字符串
      return str;
    }
  }
  function checkRemoveHttp(str) {
    // 检查字符串是否包含http
    if (str.includes("url-")) {
      // 如果包含，找到http的位置
      let index = str.indexOf("url-");
      // 包含
      return true;
    } else {
      // 不包含
      return false;
    }
  }
}

export default BlogPostCard
