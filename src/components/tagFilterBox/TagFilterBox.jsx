import './styles.css';
import { Tag } from '../../components/tag/Tag';
import { TagButton } from '../../components/tagButton/TagButton';
import { useState, useEffect } from 'react';

export const TagFilterBox = ({ collections, handleApplyClick, handleCancelClick }) => {
  return (
    <div className="tag-filter-box">
      {collections?.map((collection) =>
        collection.tags?.map((tag) => (
          <div padding="5px">
            <Tag key={tag.name} tag={tag.name} clickable={true}></Tag>
          </div>
        ))
      )}
      <div className="tag-buttons">
        <TagButton text="Apply" func={handleApplyClick}></TagButton>
        <TagButton text="Cancel" func={handleCancelClick}></TagButton>
      </div>
    </div>
  );
};
