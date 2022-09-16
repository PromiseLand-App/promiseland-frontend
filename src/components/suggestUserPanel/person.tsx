import IPerson from '../../schemas/person';
import Button from './button';

interface IProps {
  person: IPerson;
}

const Person = ({ person }: IProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <img className="w-full" src={person.image} alt={person.username} />
        </div>

        <div className="text-xs">
          <h3 className="text-sm font-semibold">{person.username}</h3>
          {/* <h4 className="opacity-50">Followed by {person.followedBy}</h4> */}
        </div>
      </div>

      <Button>Follow</Button>
    </div>
  );
};

export default Person;
