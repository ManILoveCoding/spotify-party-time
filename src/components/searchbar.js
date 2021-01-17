import { useState, forwardRef } from 'react';
import useDebounce from '../utils/debounce';
import useAxios from '../utils/axios';

const SearchResult = ({ result: { artist, album, name, image, id }, selected, ...rest }) => {
  return (
    <>
      <div
        {...rest}
        style={{
          alignItems: 'center',
          cursor: 'pointer',
          padding: '0.5rem',
          border: 'solid darkslategrey',
          borderWidth: '0 0 1px 0',
          overflow: 'hidden',
          backgroundColor: selected ? 'rgba(249, 250, 251, 1)' : '',
          display: 'flex',
        }}>
        <img alt="" style={{ width: '6rem', margin: '0.5rem' }} src={image} />
        <span style={{ lineHeight: '1.375', width: '100%' }}>
          <h4 style={{ fontWeight: '400' }}>{album}</h4>
          <h3 style={{ fontWeight: '600' }}>{name}</h3>
          <p style={{ opacity: '1', color: 'color: rgba(55, 65, 81, 1)' }}>{artist}</p>
        </span>
      </div>
    </>
  );
};

export default forwardRef(({ onSelect, access_token, ...rest }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  access_token =
    'BQCAtX2sPoGFo1O75B60f9NvdhYckP0XpyMehpUUT91QiqNGuFD181REpGMCfyZGf5FjuJQP1iQZitTlHHjQ-D6VkAc6Da5XGPIg1jkoLDZDIGMH7OUPrgNRNYi3DNHYCZ1cXXM';

  const { data, _, loading: searchInFlight } = useAxios(
    debouncedSearchTerm === '' && !access_token
      ? null
      : {
          method: 'get',
          url: `https://api.spotify.com/v1/search?${encodeURI(
            `q=${debouncedSearchTerm}`
          )}&type=track&limit=7`,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
  );

  const isLoading = debouncedSearchTerm !== searchTerm || searchInFlight;

  let results;

  if (data) {
    results = [];
    data['tracks']['items'].forEach((item) => {
      results.push({
        artist: item['album']['artists'][0]['name'],
        image: item['album']['images'][0]['url'],
        album: item['album']['name'],
        name: item['name'],
        id: item['id'],
      });
    });
  }

  if (!results) {
    results = [];
  }

  function setModal(open) {
    setSelectedIndex(0);
    if (open) {
      setOpen(open);
      document.body.classList.add('modal-open');
    } else {
      setOpen(open);
      document.body.classList.remove('modal-open');
    }
  }

  return (
    <>
      <form
        style={{
          zIndex: '40',
          borderRadius: '4px',
          background: 'white',
          position: open ? 'static' : 'relative',
          top: open ? '0px' : '',
          left: open ? '0px' : '',
          width: open ? '100%' : '',
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            setSelectedIndex((selectedIndex + 1) % results.length);
          }
          if (e.key === 'n' && e.ctrlKey) {
            setSelectedIndex((selectedIndex + 1) % results.length);
            e.preventDefault();
          }
          if (e.key === 'ArrowUp') {
            setSelectedIndex((selectedIndex - 1 + results.length) % results.length);
          }
          if (e.key === 'p' && e.ctrlKey) {
            setSelectedIndex((selectedIndex - 1 + results.length) % results.length);
            e.preventDefault();
          }
          if (e.key === 'Escape') {
            ref.current.blur();
          }
          if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) {
              setSelectedIndex((selectedIndex - 1 + results.length) % results.length);
            } else {
              setSelectedIndex((selectedIndex + 1) % results.length);
            }
          }
        }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isLoading && selectedIndex !== -1) {
            setSelectedIndex(-1);
            onSelect(results[selectedIndex]);
            setModal(false);
            ref.current.blur();
          }
        }}>
        <input
          tabIndex={0}
          ref={ref}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={(e) => setModal(true)}
          style={{
            appearance: 'none',
            fontSize: '0.875rem',
            lineHeight: '1.5rem',
            border: '1px',
            borderColor: 'rgba(156, 163, 175 1)',
            width: '100%',
            padding: open ? '10, 4, 2, 4' : '2, 4, 2, 4',
          }}
          {...rest}
        />
        {results && (
          <div
            style={{
              display: open ? 'block' : 'none',
              position: open ? 'absolute' : '',
              width: open ? '365px' : '',
              color: 'black',
              height: open ? 'auto' : '',
              zIndex: '50',
              borderWidth: '1px',
              borderColor: 'rgba(209, 213, 219, 1)',
              backgroundColor: 'white',
              boxSizing: 'border-box',
            }}
            onTouchStart={(e) => ref.current.blur()}>
            {results.map((x, idx) => (
              <SearchResult
                key={idx}
                result={x}
                onMouseOver={(e) => setSelectedIndex(idx)}
                onClick={(e) => {
                  // set current selected modal index to none
                  setSelectedIndex(-1);
                  // tell index.js that we selected x (the album)
                  onSelect(x);
                  // hide the modal
                  setModal(false);
                  // blur
                  ref.current.blur();
                }}
                selected={idx === selectedIndex}
              />
            ))}
          </div>
        )}
      </form>
    </>
  );
});
