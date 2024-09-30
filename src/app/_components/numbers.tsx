import React from "react";

type Props = {};

const Numbers = (props: Props) => {
  const NumberFeats = [
    {
      id: 1,
      feat: "20",
      sign: "+",
      title: "Happy Clients",
    },

    {
      id: 2,
      feat: "90",
      sign: "+",
      title: "NPS Score",
    },
    {
      id: 3,
      feat: "20",
      sign: "+",
      title: "Team members",
    },
    {
      id: 4,
      feat: "99",
      sign: "%",
      title: "Customer Satisfaction",
    },
  ];

  return (
    <main>
      <h1 className=" font-league-spartan text-lg lg:text-2xl text-center">
        Our results in numbers
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between mt-[100px]">
        {NumberFeats.map((feat) => (
          <div
            key={feat.id}
            className="flex flex-col items-center justify-center gap-2 lg:gap-4 mt-6 lg:mt-0"
          >
            <p className="font-league-spartan text-6xl">
              {feat.feat}{" "}
              <span className="button-grad bg-clip-text text-5xl text-transparent">
                {feat.sign}
              </span>
            </p>
            <p className="font-league-spartan text-xl">{feat.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Numbers;
