import * as React from 'react';

import { ApiItem } from '../../api/ApiItem';

import './PagerItem.css';

export const PagerItem = (props: { data: ApiItem }) => (
  <article className="pager-item">
    <div className="pager-item__id">
      <svg viewBox="0 0 250 25">
        <text x="0" y="20">
          {props.data._id}
        </text>
      </svg>
    </div>
    <h3 className="pager-item__title">{props.data.title}</h3>
    <div className="pager-item__date">
      {new Date(props.data.date).toUTCString()}
    </div>
    <div className="pager-item__description">{props.data.description}</div>
  </article>
);
