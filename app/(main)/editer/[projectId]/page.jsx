import React, { use } from 'react'

const  Editer = async() => {


    const {projectId} = await useParams();
  return (
    <div>Editer: {projectId}</div>
  )
}

export default Editer