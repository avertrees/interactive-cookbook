'use client';

import { css } from '@styled-system/css';
import { hstack, vstack } from '@/styled-system/patterns';
// import { grid, flex } from "@pandacss/dev";

import { useState } from 'react';

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('');
  // const [searchType, setSearchType] = useState('scientific');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log({ searchTerm, searchType });
    console.log({ searchTerm });
  };

  return (
    // <form onSubmit={handleSubmit} className={vstack({ gap: '4', p: '6', maxW: 'sm', mx: 'auto' })}>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter keyword..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // className={css({ p: '2', w: 'full', border: '1px solid', borderColor: 'gray.300', rounded: 'md' })}
      />
      {/* <div className={hstack({ gap: '4' })}> */}
      {/* <div>
        <label className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
          <input
            type="radio"
            name="searchType"
            value="scientific"
            checked={searchType === 'scientific'}
            onChange={() => setSearchType('scientific')}
          />
          Scientific Name
        </label>
        <label className={css({ display: 'flex', alignItems: 'center', gap: '2' })}>
          <input
            type="radio"
            name="searchType"
            value="common"
            checked={searchType === 'common'}
            onChange={() => setSearchType('common')}
          />
          Common Name
        </label>
      </div> */}
      <button
        type="submit"
        // className={css({ bg: 'blue.500', color: 'white', px: '4', py: '2', rounded: 'md', _hover: { bg: 'blue.600' } })}
      >
        Search
      </button>
    </form>
  );
}
