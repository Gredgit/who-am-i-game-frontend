import clsx from 'clsx';
import FiltersContainer from '../filters-container/filters-container';
import './table-column-title.scss';

function TableColumnTitle({
  className,
  name,
  filtersGroup,
  setFilter,
  displayDropdown,
  setDisplayDropdown,
  children,
}) {
  const onClickHandler = (event) => {
    if (
      event.target.className.includes('table-header__column') ||
      event.target.className.includes('icon')
    ) {
      setDisplayDropdown((state) => !state);
    }
  };

  return (
    <th
      className={clsx('table-header__column', className)}
      onClick={onClickHandler}
    >
      <div
        className={clsx('icon', {
          'icon-green': filtersGroup.some((filter) => filter.checked),
        })}
      ></div>
      {displayDropdown && (
        <FiltersContainer
          name={name}
          filtersGroup={filtersGroup}
          setFilter={setFilter}
        />
      )}
      {children}
    </th>
  );
}

export default TableColumnTitle;
