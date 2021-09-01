import HomepageTemplate, { Props as HomepageTemplateProps } from '@components/templates/HomepageTemplate'
import loadAllRecords from '@lib/loadAllRecords'
import omitUndefinedFields from '@util/omitUndefinedFields'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps<HomepageTemplateProps> = async () => {
    const posts = await loadAllRecords('posts')
    const searchPosts = posts.filter(record => record.frontMatter.tags.includes('search')).slice(0,3)
    const videoPosts = posts.filter(record => record.frontMatter.tags.includes('video')).slice(0,3)

    return {
        props: {
            searchPosts: searchPosts.map(post => omitUndefinedFields({ ...post, url: `/${post.slug}` })),
            videoPosts: videoPosts.map(post => omitUndefinedFields({ ...post, url: `/${post.slug}` })),
        },
    }
}

export default HomepageTemplate
