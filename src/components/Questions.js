import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { setHouseholdInfo } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

function Questions() {
  const [individuals, setIndividuals] = useState(
    localStorage.getItem("individuals")
      ? localStorage.getItem("individuals")
      : 0
  );
  const [occupations, setOccupations] = useState(
    localStorage.getItem("occupations")
      ? localStorage.getItem("occupations")
      : []
  );
  const [monthlyIncome, setMonthlyIncome] = useState(
    localStorage.getItem("monthlyIncome")
      ? localStorage.getItem("monthlyIncome")
      : 0
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const handleOccupations = (e) => {
    if (occupations.length === 1) {
      return setOccupations(e.target.value);
    }
    const arrayOfOccupations = e.target.value.trim().split(",");
    setOccupations(arrayOfOccupations);
  };
  const handleContinue = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        setHouseholdInfo({
          individuals,
          occupations,
          monthlyIncome,
        })
      );
      localStorage.setItem("individuals", individuals);
      localStorage.setItem("occupations", occupations);
      localStorage.setItem("monthlyIncome", monthlyIncome);
      await history.push("/feedback");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form">
      <h1>Questions (Pangutana)</h1>
      <p>
        The answers to these questions will remain private and can only be
        accessed by the researchers.
      </p>
      <p>
        Household - According to the Philippine Statistics Authority, a
        household is a social unit consisting of a person living alone or a
        group of persons who sleep in the same housing unit and agree to
        contribute income in the preparation and consumption of food. Children
        of parents are considered members of a household ,but they do not earn
        income. If a working individual does not contribute to the household
        income they are not part of the household.
      </p>
      <p>
        Example :<br />
        - A group of roommates living in a dorm. <br />
        - Family living in a house. <br />- If a group of people is living in an
        apartment or townhouse, that group is only considered a family when they
        live in the same unit/s and have eaten and contribute income/services to
        prepare and eat the same food.
      </p>
      <p>Translation: (Cebuano)</p>
      <p>
        Household - Ayon sa Philippine Statistics Authority, ang panimalay ay
        usa ka sosyal nga yunit nga gilangkuban sa usa ka tawo nga nag-inusara
        nga nagpuyo o usa ka grupo sa mga tawo nga natulog sa parehas nga yunit
        sa pabalay ug nag-uyon nga maghatag kontribusyon sa pag-andam ug
        pag-konsumo sa pagkaon. Ang mga anak sa mga ginikanan giisip nga mga
        miyembro sa usa ka panimalay ug igiapil sa gidaghanon sa mga myembro sa
        panimalay. Kung ang usa ka nagtrabaho nga indibidwal wala mag-amot sa
        kita sa panimalay dili sila bahin sa panimalay.
      </p>
      <p>
        Pananglitan: <br />
        - Usa ka grupo sa mga kauban sa kwarto nga nagpuyo sa usa ka dorm.
        <br />
        - Pamilya nga nagpuyo sa usa ka balay.
        <br />- Kung ang usa ka grupo sa mga tawo nagpuyo sa usa ka apartment o
        townhouse, ang kana nga grupo giisip lamang nga usa ka pamilya kung
        nagpuyo sila sa parehas nga yunit ug nikaon ug nag-amot sa kita/serbisyo
        aron maandam ug mokaon sa parehas nga pagkaon.
      </p>
      <div className="form-group">
        <h3>
          How many individuals living in your household or family are 15 years
          old above and earning income? Please input a number. (Pila ka
          indibidwal nga nagpuyo sa panimalay o pamilya nga 15 anyos na pataas
          nga naay kita?)
        </h3>
        <TextField
          InputProps={{ inputProps: { min: 0 } }}
          type="number"
          min="0"
          value={individuals}
          onChange={(e) => {
            setIndividuals(e.target.value);
          }}
          required
          label="Ex. 3"
          helperText="Number of Household Members older than 15 earning income."
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="form-group">
        <h3>
          Please enumerate the job occupation/s of members of your household and
          separate each occupation with a comma. (Palihug isulat ang trabaho /
          mga trabaho sa mga myembro sa imong panimalay ug ibulag ang matag
          trabaho sa usa ka koma.)
        </h3>
        <TextField
          type="text"
          value={occupations}
          onChange={handleOccupations}
          required
          label="Ex. Engineer, Businessman, Teacher, CEO, etc."
          helperText="Occupation of Eligible Household Members"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="form-group">
        <h3>
          Between what range of income do the individuals in your
          household/family (15 years old and above) earn monthly income. Please
          select one option for every person that is earning income. (ex: if two
          people earn income, 3,000 php - 6,000 php and 21,000 php - 24,000 php)
          (Taliwala sa unsang sakup sa kita ang naangkon sa mga indibidwal sa
          imong panimalay / pamilya (15 anyos pataas) nga makakuha matag bulan.
          Palihug pagpili usa ka kapilian alang sa matag tawo nga adunay kita)
        </h3>
        <TextField
          InputProps={{ inputProps: { min: 0 } }}
          type="number"
          value={monthlyIncome}
          onChange={(e) => {
            setMonthlyIncome(e.target.value);
          }}
          required
          label="Ex. 100000"
          helperText="Sum of Monthly Income of Household"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="form-nav-buttons">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => history.goBack()}
        >
          Previous
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Questions;
