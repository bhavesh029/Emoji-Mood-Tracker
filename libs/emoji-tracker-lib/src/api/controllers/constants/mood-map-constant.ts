import { Angry, Happy, Loved, Sad, Stresed } from "./mood-contant";

const MoodhashMap = new Map<string, string>();

MoodhashMap.set("happy", Happy);
MoodhashMap.set("accomplished", Happy);
MoodhashMap.set("excited", Happy);
MoodhashMap.set("blissful", Happy);
MoodhashMap.set("bright", Happy);
MoodhashMap.set("calm", Happy);
MoodhashMap.set("carefree", Happy);
MoodhashMap.set("cheerful", Happy);
MoodhashMap.set("harmonious", Happy);
MoodhashMap.set("joyful", Happy);
MoodhashMap.set("joyous", Happy);

MoodhashMap.set("sad", Sad);
MoodhashMap.set("Hopeless", Sad);
MoodhashMap.set("Humiliated", Sad);
MoodhashMap.set("Indignant", Sad);

MoodhashMap.set("angry", Angry);
MoodhashMap.set("Irritated", Angry);
MoodhashMap.set("Inferior", Angry);
MoodhashMap.set("Mad", Angry);
MoodhashMap.set("Manipulative", Angry);

MoodhashMap.set("stressed", Stresed);
MoodhashMap.set("Negative", Stresed);
MoodhashMap.set("Lost", Stresed);
MoodhashMap.set("On Edge", Stresed);
MoodhashMap.set("Tense", Stresed);

MoodhashMap.set("Loved", Loved);
MoodhashMap.set("love", Loved);
MoodhashMap.set("lust", Loved);
MoodhashMap.set("care", Loved);

export default MoodhashMap;
