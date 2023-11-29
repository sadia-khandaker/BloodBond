import axios from "axios";
import {Box, Container, Typography} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {BackButton} from "../components/BackButton";
import {BloodBondTitle} from "../components/BloodBondTitle";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import {Background} from "../components/Background";
import {IconInputField} from "../components/IconInputField";

import {GradientChangingButton} from "../components/GradientChangingButton";

const Doctor = () => {

  const navigate = useNavigate();

  const [valueToCheck, setValueToCheck] = useState('');
  const [checkResult, setCheckResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/verifyDoctor', {
        valueToCheck,
      });
      setCheckResult(response.data.exists);
      if (response.data.exists) {
        navigate("/DoctorHome");
      } else {
        alert("Invalid ID");
      }
    } catch (error) {
      console.error('Error checking existence:', error);
    }
  };
 
  const handleClickBack = async (e) => {
    e.preventDefault();
    try {
      // Go to specified page
        navigate("/");

    } catch (err) {
      console.log(err);
    }
  };

  return (
      <Background>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <BackButton onClick={handleClickBack} sx={{mt: 4}}/>
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4}}>
            <BloodBondTitle/>
          </Box>
          <Container maxWidth="sm" sx={{pt: 8, pb: 6}}>
            <Box sx={{borderRadius: '20px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', p: 4, bgcolor: 'white'}}>
              <Typography variant="h3" align="center" color="#B71C1C" gutterBottom sx={{fontWeight: 700, py: 1, px: 2}}>
                Doctor Login
              </Typography>
              <Typography variant="subtitle1" align="center" color="text.secondary"
                          sx={{fontWeight: 400, my: 2, px: 4}}>
                As a BloodBond doctor, you can access your patient information, register new recipients, log blood
                donations, and more.
              </Typography>
              <Typography variant="subtitle1" align="center" color="text.secondary"
                          sx={{fontWeight: 300, mb: 2, px: 4}}>
                Please enter your employee ID to log in to your account.
              </Typography>
              <IconInputField
                  label="Employee ID"
                  icon={<MedicalInformationOutlinedIcon sx={{color: '#B71C1C', fontSize: 18}}/>}
                  value={valueToCheck}
                  onChange={(e) => setValueToCheck(e.target.value)}
                  sx={{mb: 2}}
              />
              <Box sx={{display: 'flex', justifyContent: 'center', px: 4}}>
                <GradientChangingButton text="Log in" onClick={handleSubmit} sx={{mb: 2}}/>
              </Box>
              {checkResult !== null && (
                  <Typography variant="body1" align="center" gutterBottom sx={{mt: 2}}>
                    {checkResult ? 'Welcome back, Doctor! Redirecting to your account...' : 'The employee ID you entered is invalid. Please check your ID and try again.'}
                  </Typography>
              )}
            </Box>
          </Container>
        </Box>
      </Background>

  );
};

export default Doctor;