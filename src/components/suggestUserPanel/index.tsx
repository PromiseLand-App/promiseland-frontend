import people from "./mockUserData";
import IPerson from "../../schemas/person";
import Button from "./button";
import Person from "./person";

const Panel = () => {
  return (
    <section className="w-[22rem] hidden lg:block lg:fixed ml-[30.5rem] space-y-4 pt-4 px-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold opacity-50">Suggestions Uers For You</h1>
        <Button blacked>See All</Button>
      </div>

      <div className="space-y-4">
        {people.map((person: IPerson) => (
          <Person key={person.id} person={person} />
        ))}
      </div>
    </section>
  );
};

export default Panel;
