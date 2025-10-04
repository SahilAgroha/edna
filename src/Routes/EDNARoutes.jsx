import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Overview from '../Dashboard/components/Overview/Overview'
import Abundance from '../Dashboard/components/Aboundance/Abundance'
import DiversityAnalytics from '../Dashboard/components/DiversityAnalytics/DiversityAnalytics'
import NovelTaxa from '../Dashboard/components/NovelTaxa/NovelTaxa'
import TaxaExplorer from '../Dashboard/components/TaxaExplorer/TaxaExplorer'
import Chatbot from '../Dashboard/components/Chatbot/Chatbot'
import Settings from '../Dashboard/components/Settings/Settings'
// import TaxaDetail from '../Dashboard/components/TaxaExplorer/TaxaDetail'
// import NovelTaxaDetail from '../Dashboard/components/NovelTaxa/NovelTaxaDetails'
// import DiversityDetail from '../Dashboard/components/DiversityAnalytics/DiversityDetail'
// import AnalysisDetail from '../Dashboard/components/Overview/AnalysisDetail'
import UploadFile from '../Dashboard/components/UploadFile/UploadFile'

const EDNARoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Overview/>}/>
        <Route path="/upload" element={<UploadFile />} />
        {/* <Route path="/analysis/:analysisId" element={<AnalysisDetail />} /> */}
        <Route path='/abundance' element={<Abundance/>}/>
        <Route path='/diversity' element={<DiversityAnalytics/>}/>
        {/* <Route path='/diversity/:id' element={<DiversityDetail/>}/> */}
        <Route path='/novel-taxa' element={<NovelTaxa/>}/>
        {/* <Route path='/novel-taxa/:id' element={<NovelTaxaDetail/>}/> */}
        <Route path='/taxa-explorer' element={<TaxaExplorer/>}/>
        {/* <Route path='/taxa-explorer/:id' element={<TaxaDetail/>}/> */}
        <Route path='/chatbot' element={<Chatbot/>}/>
        <Route path='/settings' element={<Settings/>}/>
    </Routes>
  )
}

export default EDNARoutes