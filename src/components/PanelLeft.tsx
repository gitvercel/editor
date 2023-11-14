import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BsFillTrash3Fill } from 'react-icons/bs';
import styles from '../styles/editor.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { NameInput } from './NameInput';
import { RootState } from '../shared/redux/store';
import { createPage, deletePage, selectPageStart, updatePageName } from '../shared/redux/actions/page.actions';
import { updateElementName } from '../shared/redux/actions/element.actions';

export default function PanelLeft() {
  const pages = useSelector((state: RootState) => state.page.pages);
  const selectedPage = useSelector(
    (state: RootState) => state.selectedPage.page
  );
  const dispatch = useDispatch();

  const handlePageCreate = () => {
    dispatch(createPage());
  };

  const handlePageSelect = (pageId: string) => {
    dispatch(selectPageStart(pageId));
  };

  const handlePageDelete = (pageId: string) => {
    dispatch(deletePage(pageId));
  };

  const handleUpdatePageName = (pageId: string, newName: string) => {
    dispatch(updatePageName(pageId, newName));
  };

  const handleUpdateElementName = (elementId: string, newName: string) => {
    dispatch(updateElementName(elementId, newName));
  };

  return (
    <section className={styles.panelLeft}>
      <div className={styles.panelHead}>
        <div className={styles.panelHeadTitle}>{selectedPage?.name || ''}</div>
        <div className={styles.panelHeadBtn}>
          
          <BsFillPlusSquareFill onClick={() => handlePageCreate()} aria-label="Add Page"></BsFillPlusSquareFill>

          {selectedPage ? (<BsFillTrash3Fill onClick={() => handlePageDelete(selectedPage.id)} aria-label="Delete Page"></BsFillTrash3Fill>) 
          : (<BsFillTrash3Fill className={styles.inactive}></BsFillTrash3Fill>)}

        </div>
      </div>

      <div className={styles.panelBody}>
        {pages.map((item:any, idx:any) => {
          const page = item.id === selectedPage?.id ? selectedPage : item;

          return (
            <div
              key={page.id}
              role="row"
              aria-label={`id-${page.id}, Page Name-${page.name}`}
              className={`${styles.pageThumbnailWrapper} ${selectedPage?.id === page.id ? styles.activeItem : 'not-active'}`}
              onClick={() => handlePageSelect(page.id)}>
              <p>{idx +1}</p>
              <div>
                  <NameInput
                    name={page.name}
                    onUpdateName={(newName: string) => {
                      handleUpdatePageName(page.id, newName);
                    }}
                  ></NameInput>
                {page.thumbnail ? (
                  <img
                    src={page.thumbnail || ''}
                    alt={page.name}
                    role="img" aria-label="Thumbnail of the page"
                    className={styles.pageImage}
                    height={50} width={100}
                   
                  />
                ) : ( <div className={styles.emptyImage} role="img" aria-label="Thumbnail of the Blank page"></div> )}
              </div>
            </div>
          );})}
      </div>

      <div className={styles.panelHead}>
        <div className={styles.panelHeadTitle}>Components</div>
      </div>

      <div className={styles.panelBody}>
        <ul>
          {selectedPage?.elements.map((element:any) => (
            <li key={element.code}>
              <NameInput
                name={element.name}
                onUpdateName={(newName: string) => {handleUpdateElementName(element.code, newName)}}
                subname={element.data.type}
              ></NameInput>
            </li> ))}
        </ul>
      </div>
    </section>
  );
}
