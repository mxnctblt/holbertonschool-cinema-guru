import SearchBar from '../general/SearchBar';
import Input from '../general/Input';
import './movies.css';
import SelectInput from '../general/SelectInput';
import Tag from './Tag';

const Filter = ({
                    minYear,
                    setMinYear,
                    maxYear,
                    setMaxYear,
                    sort,
                    setSort,
                    genres,
                    setGenres,
                    title,
                    setTitle,
                }) => {
    const tags = [
        `Action`,
        `Drama`,
        `Comedy`,
        `Biography`,
        `Romance`,
        `Thriller`,
        `War`,
        `History`,
        `Sport`,
        `Sci-fi`,
        `Documentary`,
        `Crime`,
        `Fantasy`,
    ];
    return (
        <div className="filter">
            <div className="search">
                <SearchBar value={title} setTitle={setTitle}/>
                <div className="inputs">
                    <Input label={'Min Date'} type={'number'} className={'dark'} value={minYear}
                           setValue={setMinYear}/>
                    <Input label={'Max Date'} type={'number'} className={'dark'} value={maxYear} setValue={setMaxYear}/>
                    <SelectInput
                        label={'Sort'}
                        className={'dark'}
                        options={['Default', 'Latest', 'Oldest', 'Highestrated', 'Lowestrated']}
                        setValue={setSort}
                        value={sort}

                    />
                </div>
            </div>
            <div className="tags">
                {tags.map((tag, index) => (
                    <Tag key={index} genre={tag} genres={genres} setGenres={setGenres}/>
                ))}
            </div>
        </div>
    );
};

export default Filter;
