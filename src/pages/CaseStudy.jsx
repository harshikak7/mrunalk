import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { getProject } from '../data/projects'
import { site } from '../data/site'
import NotFound from './NotFound'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />

  return (
    <Layout>
      <div className="px-6 md:px-[18px]">
        <h1 className="font-serif text-[40px] font-semibold">{project.name}</h1>
        <p className="mt-4 text-text-secondary">{site.caseStudy.comingSoon}</p>
      </div>
    </Layout>
  )
}
