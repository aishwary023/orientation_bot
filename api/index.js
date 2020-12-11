import { Telegraf } from "telegraf";
import dotenv from 'dotenv';
import { getBunnies, getCat, getDog, getDuck, getFox, starter } from './functions/animals';
import { lingo } from './functions/lingo';
import { greet, stickerPhotoReply } from "./functions/utils";
import { getMeme, getMemeCommands } from "./functions/memes";
import { googleSearch, imageSearch } from "./functions/google-search";
import { getGif } from "./functions/giphy";
import { wordSearch } from "./functions/dictionary";
import { councils } from "./functions/councils";
import { cc, fmc, gnsc, sntc, ssc } from "./functions/councils/clubs";

dotenv.config();
const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx)=>{
    console.log(ctx.from.first_name,": /start");
    const name = ctx.message.from ? ctx.message.from.first_name : 'Fachhe';
    ctx.reply(`Hey ${name}! Welcome to the BHU Fam! type /help for list of commands`);
});

bot.catch((err, ctx) => {
    console.log('Error, ', ctx.from.first_name, " - ", err)
    console.log(err.message)
    const errMsg = "Did not quite get what you said, please contact @aishwary023 for the issue!";
    ctx.reply(errMsg);
});

bot.help(async (ctx) => {
    console.log(ctx.from.first_name,": /help")
    const helpMsg ="/councils - Info about IIT-BHU Gymkhana coucils and clubs\n\n/dict or /dictionary - For using dictionary\n\n/lingo for lingo \n\n/animals - to explore animal collection\n\n/help - For all available function\nGot any other query? Contact these people anytime: ";
    try {
        await ctx.replyWithMarkdown(helpMsg);
    } catch (e) {
        console.log(e)
        await ctx.reply('Facing server issues, try again later.\nSorry for inconvenience.')
    }
});

bot.command('animals', (ctx) => starter(ctx));
bot.command('dog', (ctx) => getDog(ctx));
bot.command('cat', (ctx) => getCat(ctx));
bot.command('fox', (ctx) => getFox(ctx));
bot.command('duck', (ctx) => getDuck(ctx));
bot.command('bunny', (ctx) => getBunnies(ctx));

bot.command('lingo', (ctx) => lingo(ctx));
bot.command('dict', (ctx) => wordSearch(ctx));
bot.command('dictionary', (ctx) => wordSearch(ctx));

bot.command('meme', (ctx) => getMemeCommands(ctx));
bot.command('memes', (ctx) => getMemeCommands(ctx));
bot.command('randomMeme', (ctx)=> getMeme(ctx, 'memes'));
bot.command('wholesomeMeme', (ctx)=> getMeme(ctx, 'wholesomememes'));
bot.command('indianMeme', (ctx)=> getMeme(ctx, 'IndianMeyMeys'));
bot.command('memeEconomy', (ctx)=> getMeme(ctx, 'MemeEconomy'));
bot.command('historyMeme', (ctx)=> getMeme(ctx, 'HistoryMemes'));
bot.command('animeMeme', (ctx) => getMeme(ctx, 'Animemes'));
bot.command('toorealMeme', (ctx) => getMeme(ctx, '2meirl4meirl'));
bot.command('cheems', (ctx)=> getMeme(ctx, 'dogelore'));
bot.command('herapheri', (ctx)=> getMeme(ctx, 'HeraPheriMemes'));

bot.command('google', (ctx) => googleSearch(ctx));
bot.command('image', (ctx) => imageSearch(ctx));

bot.command('gif', (ctx) => getGif(ctx))

bot.command('councils', (ctx) => councils(ctx));
bot.command('sntc', (ctx) => sntc(ctx));
bot.command('ssc', (ctx) => ssc(ctx));
bot.command('cc', (ctx) => cc(ctx));
bot.command('gnsc', (ctx) => gnsc(ctx));
bot.command('fmc', (ctx) => fmc(ctx));

bot.on('message', (ctx) => greet(ctx));
bot.on(['sticker', 'photo'], (ctx) => stickerPhotoReply(ctx));

module.exports = (req, resp) => {
    if (req.method === 'POST') bot.handleUpdate(req.body, resp)
    else resp.status(200).send('Hello world :)!')
};

bot.launch();