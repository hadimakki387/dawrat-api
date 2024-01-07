import { StudylistInterface } from '@/backend/modules/studylist/studylist.interface'
import StudyList from '@/components/SVGs/StudyList'
import DaPopOver from '@/components/global/DaPopOver'
import { faEllipsis, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
    studyList: StudylistInterface
}

function StudyListHeader({
    studyList,
}: Props) {
  return (
    <div className="rounded-2xl bg-orangeBg text-oran py-12 space-y-8 max-md:px-4 md:px-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <StudyList fill="var(--orange-text)" size={50} />
            <div className="text-darkText font-semibold text-xl">
              {studyList?.title}
            </div>
          </div>
          <div>
            <DaPopOver
              open={true}
              menuItems={[
                {
                  name: "Edit",
                  onClick: () => {
                    
                  },
                  icon: (
                    <FontAwesomeIcon
                      icon={faPen}
                      className="text-titleText text-sm hover:cursor-pointer"
                    />
                  ),
                },
                {
                  name: "Delete",
                  onClick: () => {
                    
                  },
                  icon: (
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="text-error  text-sm hover:cursor-pointer"
                    />
                  ),
                },
              ]}
            >
              <div className="flex items-center gap-4 relative">
                <FontAwesomeIcon
                  icon={faEllipsis}
                  className="text-titleText text-xl hover:cursor-pointer"
                />
              </div>
            </DaPopOver>
          </div>
        </div>
      </div>
  )
}

export default StudyListHeader