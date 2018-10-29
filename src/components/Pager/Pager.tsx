import * as React from 'react';

import { fetchItems } from '../../api/Api';
import { ApiItem } from '../../api/ApiItem';
import { PagerItem } from '../PagerItem/PagerItem';
import { Pagination } from '../Pagination/Pagination';
import { Spinner } from '../Spinner/Spinner';

import { PagerProps } from './PagerProps';
import { PagerState } from './PagerState';

import './Pager.css';

export class Pager extends React.Component<PagerProps, PagerState> {
  constructor(props: PagerProps) {
    super(props);

    this.state = {
      currentPage: 0,
      items: [],
      loading: true,
      totalPages: 0,
    };
  }

  onPageChange = (newPage: number) => {
    this.setState({
      currentPage: newPage,
    });
  };

  async componentDidMount() {
    try {
      const items: ApiItem[] = await fetchItems();

      const totalPages =
        items && items.length
          ? Math.ceil(items.length / this.props.itemsPerPage)
          : 0;

      this.setState({
        items,
        loading: false,
        totalPages,
      });
    } catch (err) {
      // TODO: add error handling.
      // For now, we just simulate API call, so it doesn't make sense :)
      console.error(err);
    }
  }

  selectPageItems(items: ApiItem[]) {
    const startingIndex = this.state.currentPage * this.props.itemsPerPage;

    let lastIndex = startingIndex + this.props.itemsPerPage;
    if (lastIndex >= items.length) {
      lastIndex = items.length;
    }

    return items && items.slice(startingIndex, lastIndex);
  }

  render() {
    return (
      <div className="pager">
        <h2>Current Page: {this.state.currentPage}</h2>
        {this.state.loading ? (
          <div className="pager__content">
            <h2>Fetching items...</h2>
            <Spinner />
          </div>
        ) : (
          <div className="pager__content">
            {this.selectPageItems(this.state.items).map(item => (
              <PagerItem key={item._id} data={item} />
            ))}
          </div>
        )}
        {this.state.totalPages > 0 && (
          <Pagination
            onPageChange={this.onPageChange}
            paginationSize={3}
            totalPages={this.state.totalPages}
            currentPage={this.state.currentPage}
          />
        )}
      </div>
    );
  }
}