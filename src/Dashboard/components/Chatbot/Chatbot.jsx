import React, { useEffect, useState, useRef } from 'react';
// 1. IMPORT LOCAL JSON DATA DIRECTLY
import localData from '../../../data/edna_prediction_data.json'; 

// Removed Redux imports: useSelector, useDispatch, fetchOverviewsAsync, fetchAnalysisAsync
import { Box, Typography, TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { Send, SmartToy } from '@mui/icons-material';
import DashboardCard from '../TaxaExplorer/DashboardCard';
// NOTE: API_KEY setup is now handled internally/statically.
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
// Assuming VITE_GEMINI_API_KEY is available in your build environment.
const API_KEY = "AIzaSyBZ63nlHx1mMv25Srg1d3iYdL_3VqOWeko"; // Keep this line if using Vite for environment variables

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

// Define static analysis data
const STATIC_ANALYSIS_ID = '1';
const STATIC_ANALYSIS_TITLE = 'Local Metagenomic Analysis';

const STATIC_OVERVIEWS = [
    { id: STATIC_ANALYSIS_ID, title: STATIC_ANALYSIS_TITLE }
];

// Define fadeIn animation for chat bubbles
const fadeInUp = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Chatbot = () => {
    // 2. Mock Redux state with local state
    const [chatHistory, setChatHistory] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedAnalysisId, setSelectedAnalysisId] = useState('');
    const [currentAnalysis, setCurrentAnalysis] = useState(null); // Holds the static JSON data
    const [status, setStatus] = useState('loading'); // Mock status
    
    const chatEndRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);

    // 3. useEffect to load the static data on component mount
    useEffect(() => {
        try {
            setCurrentAnalysis(localData);
            setSelectedAnalysisId(STATIC_ANALYSIS_ID);
            setStatus('succeeded');
            // Add a welcome message after the data is loaded
            setChatHistory([{ 
                role: 'bot', 
                content: `Hello! I'm the E-DNA Bot. I've loaded your **${STATIC_ANALYSIS_TITLE}** data. How can I help you analyze the microbial communities?` 
            }]);
        } catch (e) {
            console.error("Error loading local data:", e);
            setStatus('failed');
            setChatHistory([{ role: 'bot', content: 'Initialization failed: Cannot load local analysis data.' }]);
        }
    }, []);

    // Scroll to bottom effect remains the same
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, isLoading]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || !selectedAnalysisId || !currentAnalysis) return;

        const userMessage = { role: 'user', content: input };
        setChatHistory(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // 4. Extract data for system prompt from statically loaded JSON
        const sampleSummary = currentAnalysis?.diversity_data?.sample_summary;
        const alphaDiversity = currentAnalysis?.diversity_data?.alpha_diversity;
        const pondA_dominant = sampleSummary?.Sample_Pond_A?.dominant_kingdom || 'Unknown';
        const lakeB_shannon = alphaDiversity?.shannon_diversity?.Sample_Lake_B || 'Unknown';

        try {
            const systemPrompt = `You are a world-class microbiome data analyst named E-DNA Bot. Your task is to provide clear, concise, and helpful answers about the provided microbiome analysis data. Only answer questions related to the data provided. If asked a question unrelated to the data, politely explain that you can only analyze the provided information.

            The current analysis data is for Analysis ID: ${currentAnalysis?.id || STATIC_ANALYSIS_ID}. 
            The full JSON data object is: ${JSON.stringify(currentAnalysis)}.
            Key metrics to summarize:
            - Total Samples Processed: ${currentAnalysis?.overview?.total_samples_processed}
            - Total Sequences: ${currentAnalysis?.overview?.total_sequences}
            - Dominant Kingdom (Sample_Pond_A): ${pondA_dominant}
            - Shannon Diversity (Sample_Lake_B): ${lakeB_shannon}
            
            Based on this information, provide a detailed and accurate response to the user's query.`;

            const userQuery = input;
            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                // Pass the custom system prompt with data to the model
                config: { systemInstruction: systemPrompt }, 
            };
            
            // Note: The payload structure above needs adjustment for the current API.
            // The structure below aligns with the provided API_URL pattern using systemInstruction in the main payload.
            const finalPayload = {
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            };


            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalPayload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'API request failed');
            }

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content) {
                const botMessage = result.candidates[0].content.parts[0].text;
                setChatHistory(prev => [...prev, { role: 'bot', content: botMessage }]);
            } else {
                 setChatHistory(prev => [...prev, { role: 'bot', content: 'Sorry, I received an empty response from the service. Please try a different query.' }]);
            }

        } catch (err) {
            setChatHistory(prev => [...prev, { role: 'bot', content: `Sorry, I am unable to connect to the service. Please check the API key, network, and console for details.` }]);
            console.error('API call failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 5. Analysis Change Handler (Mocked)
    const handleAnalysisChange = (event) => {
        const id = event.target.value;
        setSelectedAnalysisId(id);
        if (id === STATIC_ANALYSIS_ID) {
            setCurrentAnalysis(localData);
            setChatHistory([{ 
                role: 'bot', 
                content: `Analysis **${STATIC_ANALYSIS_TITLE}** loaded. Ready for your questions!` 
            }]);
        } else {
            setCurrentAnalysis(null);
            setChatHistory([{ role: 'bot', content: 'Please select a valid local analysis.' }]);
        }
    };

    const LoadingDots = () => (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
            <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: '#00bcd4', mx: '4px', animation: 'dotPulse 1.2s infinite ease-in-out' }} />
            <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: '#00bcd4', mx: '4px', animation: 'dotPulse 1.2s infinite ease-in-out', animationDelay: '0.2s' }} />
            <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: '#00bcd4', mx: '4px', animation: 'dotPulse 1.2s infinite ease-in-out', animationDelay: '0.4s' }} />
        </Box>
    );

    if (status === 'loading') {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', bgcolor: 'transparent', color: 'grey.200' }}>
                <CircularProgress color="primary" />
                <Typography variant="h5" sx={{ ml: 2 }}>Initializing chatbot with local data...</Typography>
            </Box>
        );
    }
    
    // 6. Keep the existing JSX structure for rendering
    return (
        <Box sx={{ p: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box className="flex items-center justify-between mb-6">
                <div>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }} className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent animate-pulse-light">
                        E-DNA Chatbot
                    </Typography>
                    <Typography className="text-gray-400 text-sm mt-1">Ask questions about the selected analysis data</Typography>
                </div>
                
                <DashboardCard 
                  className={`mb-1 p-1 md:p-1 lg:p-1 flex items-center justify-between
                    transition-all duration-300 ease-in-out
                    ${isDropdownOpen ? 'running-border' : 'running-border'}
                  `}
        >
                    <FormControl 
                        variant="filled" 
                        fullWidth
                        sx={{ 
                            bgcolor: 'transparent', 
                            borderRadius: 1,
                            minWidth: 240, 
                            width: 350,
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'rgba(255,255,255,0.05) !important',
                                borderRadius: '12px',
                                color: 'white',
                                transition: 'background-color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 188, 212, 0.2) !important',
                                    color: 'cyan.300',
                                    fontWeight: 'bold',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05) !important',
                                },
                                '&::before, &::after': {
                                    display: 'none',
                                },
                            },
                            '& .MuiInputLabel-filled': {
                                color: 'grey.400',
                                '&.Mui-focused': {
                                    color: 'cyan.300',
                                },
                            },
                            '& .MuiSelect-select': {
                                color: 'white',
                                paddingRight: '32px !important',
                            },
                            '& .MuiSvgIcon-root': {
                                color: 'white',
                                transition: 'transform 0.3s ease-in-out',
                                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            },
                            '& .MuiMenu-paper': {
                                bgcolor: 'rgba(30, 41, 59, 0.9) !important',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                            },
                            '& .MuiMenuItem-root': {
                                color: 'grey.300',
                                '&:hover': {
                                    bgcolor: 'rgba(0, 188, 212, 0.1) !important',
                                    color: 'cyan.300',
                                },
                                '&.Mui-selected': {
                                    bgcolor: 'rgba(0, 188, 212, 0.2) !important',
                                    color: 'cyan.300',
                                    fontWeight: 'bold',
                                },
                            },
                        }}
                    >
                        <InputLabel id="analysis-select-label">Select Analysis</InputLabel>
                        <Select
                            labelId="analysis-select-label"
                            id="analysis-select"
                            value={selectedAnalysisId}
                            onChange={handleAnalysisChange}
                            onOpen={() => setIsDropdownOpen(true)}
                            onClose={() => setIsDropdownOpen(false)}
                            label="Select Analysis"
                            MenuProps={{
                                PaperProps: { sx: { marginTop: '8px' } },
                                TransitionProps: { timeout: 200 },
                            }}
                        >
                            <MenuItem value="">
                                <em>-- Select an Analysis --</em>
                            </MenuItem>
                            {/* Render static option */}
                            {STATIC_OVERVIEWS.map(overview => (
                                <MenuItem key={overview.id} value={overview.id}>
                                    Analysis ID: {overview.id} - {overview.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DashboardCard>
            </Box>
            
            {/* The main chat section container. This is the key fix. */}
            <DashboardCard className={`flex-1 mb-4 p-6 ${isLoading ? 'animated-border' : ''}`} sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* Chat history container with overflow */}
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {chatHistory.length === 0 && !isLoading && (
                        <Box sx={{ textAlign: 'center', my: 4 }}>
                            <SmartToy sx={{ fontSize: 60, color: 'grey.500' }} />
                            <Typography variant="h6" sx={{ color: 'grey.400', mt: 2 }}>
                                How can I help you with this analysis?
                            </Typography>
                        </Box>
                    )}
                    {chatHistory.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                my: 2,
                                p: 2,
                                borderRadius: '12px',
                                bgcolor: msg.role === 'user' ? 'rgba(0,188,212,0.1)' : 'rgba(255,255,255,0.05)',
                                ml: msg.role === 'user' ? 'auto' : 0,
                                mr: msg.role === 'user' ? 0 : 'auto',
                                maxWidth: '80%',
                                animation: `fadeInUp 0.5s ease-out forwards ${index * 0.1}s`,
                                opacity: 0,
                                transform: 'translateY(20px)',
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold', color: msg.role === 'user' ? '#00bcd4' : '#4ade80' }}>
                                {msg.role === 'user' ? 'You' : 'E-DNA Bot'}
                            </Typography>
                            <Typography sx={{ color: 'white', mt: 1 }}>{msg.content}</Typography>
                        </Box>
                    ))}
                    {isLoading && (
                        <Box sx={{ textAlign: 'center', my: 2 }}>
                            <LoadingDots />
                        </Box>
                    )}
                    <div ref={chatEndRef} />
                </Box>
            </DashboardCard>
            
            {/* User input section (footer) */}
            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '16px' }}>
                <TextField
                    fullWidth
                    variant="filled"
                    placeholder="Ask a question about the analysis..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    sx={{
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.05) !important',
                            borderRadius: '12px',
                            color: 'white',
                            transition: 'background-color 0.3s',
                            boxShadow: isInputFocused ? '0 0 10px rgba(0, 188, 212, 0.6)' : 'none',
                            border: isInputFocused ? '1px solid #00bcd4' : '1px solid transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.1) !important',
                            },
                        },
                        '& .MuiInputLabel-root': { color: 'grey.400' },
                        '& .MuiInputBase-input': { color: 'white' }
                    }}
                    disabled={!selectedAnalysisId || isLoading}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        borderRadius: '12px',
                        bgcolor: '#00bcd4',
                        '&:hover': { bgcolor: '#0097a7' },
                        minWidth: '64px',
                        py: '12px',
                        transition: 'background-color 0.3s',
                    }}
                    disabled={!selectedAnalysisId || isLoading || !input.trim()}
                >
                    <Send />
                </Button>
            </form>
            
            <style>{`
                ${fadeInUp}
                @keyframes dotPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.5); }
                }
                @keyframes animated-border {
                    0% { border-color: #22d3ee; box-shadow: 0 0 10px #22d3ee; }
                    25% { border-color: #4ade80; box-shadow: 0 0 10px #4ade80; }
                    50% { border-color: #c084fc; box-shadow: 0 0 10px #c084fc; }
                    75% { border-color: #f87171; box-shadow: 0 0 10px #f87171; }
                    100% { border-color: #22d3ee; box-shadow: 0 0 10px #22d3ee; }
                }
                .animated-border { animation: animated-border 4s infinite linear; }
                .animate-pulse-light {
                    animation: pulse-light 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </Box>
    );
};

export default Chatbot;